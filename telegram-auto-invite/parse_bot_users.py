"""
Script to parse users who interacted with your bot (@home_battery_941_bot).
These users already know your business, so they're more likely to accept invitation.
"""
import json
import asyncio
import sys
import io
from telethon import TelegramClient
from telethon.tl.types import PeerUser
import config

# Fix encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

BOT_USERNAME = 'home_battery_941_bot'

async def parse_bot_users():
    """Parse all users who messaged your bot"""
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        print("✅ Successfully connected to Telegram")
        
        # Get the bot
        bot = await client.get_entity(BOT_USERNAME)
        print(f"🤖 Found bot: @{BOT_USERNAME}\n")
        
        users = []
        user_ids = set()  # To avoid duplicates
        
        print("📨 Parsing messages from bot...\n")
        
        # Get all messages from bot chat
        async for message in client.iter_messages(bot, limit=None):
            # Check if message is from a user (not from the bot itself)
            if isinstance(message.peer_id, PeerUser):
                sender = await message.get_sender()
                
                # Skip if it's the bot, deleted users, or duplicates
                if not sender or sender.bot or sender.deleted or sender.id in user_ids:
                    continue
                
                user_ids.add(sender.id)
                
                user_info = {
                    'id': sender.id,
                    'username': sender.username if sender.username else '',
                    'first_name': sender.first_name if sender.first_name else '',
                    'last_name': sender.last_name if sender.last_name else '',
                    'phone': sender.phone if sender.phone else ''
                }
                
                users.append(user_info)
                
                display_name = sender.username if sender.username else f"{sender.first_name} {sender.last_name}"
                print(f"  ✓ {display_name}")
        
        # Save to JSON file
        output_file = 'bot_users.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(users, f, ensure_ascii=False, indent=2)
        
        print(f"\n{'='*50}")
        print(f"✅ Successfully parsed {len(users)} bot users")
        print(f"📝 Saved to: {output_file}")
        print(f"{'='*50}\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(parse_bot_users())
