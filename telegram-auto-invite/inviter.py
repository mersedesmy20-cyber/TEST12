"""
Script to add parsed members to the target Telegram channel.
Handles limits, delays, and errors automatically.
"""
import json
import asyncio
import random
import sys
import io
import time
from datetime import datetime
from telethon import TelegramClient
from telethon.errors import (
    FloodWaitError, UserPrivacyRestrictedError, 
    UserNotMutualContactError, UserChannelsTooMuchError,
    UserBannedInChannelError, PeerFloodError, 
    ChatAdminRequiredError, ChannelPrivateError
)
from telethon.tl.functions.channels import InviteToChannelRequest
import config

# Fix encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

class InviteLogger:
    """Handles logging to console and file"""
    def __init__(self, filename=config.LOG_FILE):
        self.filename = filename

    def log(self, message, error=False):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_message = f"[{timestamp}] {message}"
        print(log_message)
        
        with open(self.filename, 'a', encoding='utf-8') as f:
            f.write(log_message + '\n')

async def add_members():
    logger = InviteLogger()
    
    # Load members list
    try:
        with open(config.MEMBERS_FILE, 'r', encoding='utf-8') as f:
            members = json.load(f)
        logger.log(f"📋 Loaded {len(members)} users from file")
    except FileNotFoundError:
        logger.log(f"❌ File {config.MEMBERS_FILE} not found!")
        return
    
    # Load already added users
    added_users = set()
    try:
        with open('added_users.json', 'r', encoding='utf-8') as f:
            added_users = set(json.load(f))
    except FileNotFoundError:
        pass

    # Connect to Telegram
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        logger.log("✅ Successfully connected to Telegram")
    except Exception as e:
        logger.log(f"❌ Connection error: {e}")
        return

    # Load my own contacts to SKIP them
    my_contact_ids = set()
    try:
        from telethon.tl.functions.contacts import GetContactsRequest
        result = await client(GetContactsRequest(hash=0))
        for contact in result.users:
            my_contact_ids.add(contact.id)
        logger.log(f"📵 Loaded {len(my_contact_ids)} personal contacts — they will be SKIPPED")
    except Exception as e:
        logger.log(f"⚠️ Could not load contacts (will continue without filter): {e}")

    try:
        target_group = await client.get_entity(config.TARGET_CHANNEL_ID)
        logger.log(f"🎯 Adding to channel: {target_group.title}")
    except ValueError:
        logger.log(f"❌ Could not find target channel with ID {config.TARGET_CHANNEL_ID}")
        return
    except Exception as e:
        logger.log(f"❌ Error getting target channel: {e}")
        return

    count_added = 0
    count_errors = 0
    count_skipped_contacts = 0
    
    logger.log(f"\n🚀 Starting invitation process (Target: {config.MAX_ADDS_PER_SESSION} users per session)...")

    for index, user in enumerate(members):
        if count_added >= config.MAX_ADDS_PER_SESSION:
            logger.log(f"🛑 Session limit reached ({config.MAX_ADDS_PER_SESSION}). Stopping.")
            break

        user_id = user['id']
        username = user['username'] if user['username'] else f"user_{user_id}"

        # Skip if already processed
        if user_id in added_users:
            continue

        # Skip if this is one of my personal contacts
        if user_id in my_contact_ids:
            count_skipped_contacts += 1
            added_users.add(user_id)  # Mark so we don't check again
            continue

        logger.log(f"\n[{count_added + 1}/{config.MAX_ADDS_PER_SESSION}] Adding @{username}...")

        try:
            # Ensure connection is active
            if not client.is_connected():
                logger.log("⚠️ Connection lost. Reconnecting...")
                await client.connect()

            # Try to resolve user: username first, then phone, then ID
            user_to_add = None
            resolve_method = ""

            if user.get('username'):
                try:
                    user_to_add = await client.get_input_entity(f"@{user['username']}")
                    resolve_method = "username"
                except Exception:
                    pass

            if user_to_add is None and user.get('phone'):
                try:
                    user_to_add = await client.get_input_entity(f"+{user['phone']}")
                    resolve_method = "phone"
                except Exception:
                    pass

            if user_to_add is None:
                try:
                    user_to_add = await client.get_input_entity(user_id)
                    resolve_method = "id"
                except Exception:
                    pass

            if user_to_add is None:
                logger.log(f"   ⚠️ @{username} - Cannot resolve user (no username/phone/id), skipping")
                added_users.add(user_id)
                with open('added_users.json', 'w', encoding='utf-8') as f:
                    json.dump(list(added_users), f)
                continue
            await client(InviteToChannelRequest(target_group, [user_to_add]))
            
            logger.log(f"   ✅ @{username} - Successfully added")
            count_added += 1
            added_users.add(user_id)

            # Save progress
            with open('added_users.json', 'w', encoding='utf-8') as f:
                json.dump(list(added_users), f)

            # Delay
            delay = random.randint(config.ADD_DELAY_MIN, config.ADD_DELAY_MAX)
            logger.log(f"   💤 Waiting {delay} seconds...")
            await asyncio.sleep(delay)

        except PeerFloodError:
            logger.log(f"   🚫 @{username} - PEER_FLOOD (Account limited by Telegram)")
            logger.log("   ⚠️ This specific user triggers PEER_FLOOD. Marking as processed and trying next user...")
            added_users.add(user_id)  # Mark as processed to skip in future
            count_errors += 1
            # Wait longer before trying next user after PEER_FLOOD
            await asyncio.sleep(120)  # 2 minutes cooldown
        except UserPrivacyRestrictedError:
            logger.log(f"   🔒 @{username} - Privacy settings prevent adding")
            added_users.add(user_id) # Mark as processed to skip next time
        except UserNotMutualContactError:
            logger.log(f"   🔒 @{username} - User must be a mutual contact")
            added_users.add(user_id)
        except UserChannelsTooMuchError:
            logger.log(f"   ❌ @{username} - User is in too many channels")
            added_users.add(user_id)
        except UserBannedInChannelError:
            logger.log(f"   ❌ @{username} - User is banned in channel")
            added_users.add(user_id)
        except ChatAdminRequiredError:
            logger.log(f"   ❌ Error: Admin rights required to add members")
            break
        except FloodWaitError as e:
            logger.log(f"   ⏳ FloodWait: Need to wait {e.seconds} seconds")
            count_errors += 1
            await asyncio.sleep(e.seconds)
        except Exception as e:
            logger.log(f"   ❌ @{username} - Error: {str(e)}")
            count_errors += 1
            # If error is 'Cannot send requests while disconnected', try reconnecting next loop
            if "disconnected" in str(e).lower():
                 try:
                     await client.connect()
                 except: 
                     pass
        
        # Save progress after each attempt (even failures due to privacy)
        with open('added_users.json', 'w', encoding='utf-8') as f:
            json.dump(list(added_users), f)

    logger.log(f"\n==================================================")
    logger.log(f"📊 SUMMARY:")
    logger.log(f"   ✅ Successfully added: {count_added}")
    logger.log(f"   📵 Skipped (my contacts): {count_skipped_contacts}")
    logger.log(f"   ❌ Errors: {count_errors}")
    logger.log(f"   📝 Log file: {config.LOG_FILE}")
    logger.log(f"==================================================")

    await client.disconnect()

if __name__ == '__main__':
    asyncio.run(add_members())
