"""
Wrapper to run parse_vidguky with account 1 (non-interactive auth)
"""
import json
import asyncio
import sys
import os
import io

# Fix encoding
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Add telegram-auto-invite to path
sys.path.insert(0, r'c:\Users\Merse\OneDrive\Desktop\telegram-auto-invite')
os.chdir(r'c:\Users\Merse\OneDrive\Desktop\telegram-auto-invite')

from telethon import TelegramClient
from telethon.tl.functions.messages import GetRepliesRequest
from telethon.errors import FloodWaitError

# Account 1 credentials (hardcoded to avoid config conflict)
API_ID = 37818603
API_HASH = 'e5bb6579c64d9066e0930ee9bea9bbcb'
PHONE = '+380939362967'
PASSWORD_2FA = 'AAAaaa111'
SESSION_FILE = 'telegram_session'

# Channel
CHANNEL_ID = -1002419686297
SEARCH_KEYWORDS = ['Вечірні відгуки', 'вечірні відгуки', 'Вечірні Відгуки']

async def main():
    client = TelegramClient(SESSION_FILE, API_ID, API_HASH)
    
    print("🔌 Connecting to Telegram with account 1...")
    await client.start(phone=PHONE, password=PASSWORD_2FA)
    print("✅ Connected!\n")
    
    try:
        channel = await client.get_entity(CHANNEL_ID)
        print(f"📊 Parsing channel: {channel.title}")
        print(f"   ID: {CHANNEL_ID}\n")
        
        all_commenters = {}
        post_count = 0
        vidguky_count = 0
        
        # Scan ALL messages for "Вечірні відгуки"
        print("🔍 Scanning all posts for 'Вечірні відгуки'...\n")
        
        async for message in client.iter_messages(channel, limit=None):
            post_count += 1
            
            if post_count % 100 == 0:
                print(f"   ...scanned {post_count} posts, found {vidguky_count} 'Вечірні відгуки' posts, {len(all_commenters)} unique commenters")
            
            # Check if it's a "Вечірні відгуки" post
            if message.text:
                is_vidguky = any(kw in message.text for kw in SEARCH_KEYWORDS)
            else:
                is_vidguky = False
            
            if not is_vidguky:
                continue
                
            vidguky_count += 1
            
            if not message.replies or message.replies.replies == 0:
                continue
                
            print(f"   📝 Post #{message.id} ({message.date.strftime('%Y-%m-%d')}) - {message.replies.replies} comments")
            
            try:
                # Get all comments
                offset_id = 0
                while True:
                    replies = await client(GetRepliesRequest(
                        peer=channel,
                        msg_id=message.id,
                        offset_id=offset_id,
                        offset_date=None,
                        add_offset=0,
                        limit=100,
                        max_id=0,
                        min_id=0,
                        hash=0
                    ))
                    
                    if not replies.messages:
                        break
                    
                    for reply in replies.messages:
                        if reply.from_id and hasattr(reply.from_id, 'user_id'):
                            user_id = reply.from_id.user_id
                            if user_id not in all_commenters:
                                try:
                                    user = await client.get_entity(user_id)
                                    if not user.bot:
                                        all_commenters[user_id] = {
                                            'id': user.id,
                                            'username': user.username or '',
                                            'first_name': user.first_name or '',
                                            'last_name': user.last_name or '',
                                            'phone': getattr(user, 'phone', '') or ''
                                        }
                                        print(f"      ✅ @{user.username or user.first_name} (ID: {user.id})")
                                except Exception:
                                    pass
                    
                    offset_id = replies.messages[-1].id
                    if len(replies.messages) < 100:
                        break
                    
                    await asyncio.sleep(1.5)
                
                await asyncio.sleep(2)
                
            except FloodWaitError as e:
                print(f"   ⏳ FloodWait: waiting {e.seconds} seconds...")
                await asyncio.sleep(e.seconds)
            except Exception as e:
                print(f"   ⚠️ Error: {e}")
        
        print(f"\n{'='*60}")
        print(f"📊 Parsing complete!")
        print(f"   Posts scanned: {post_count}")
        print(f"   'Вечірні відгуки' posts found: {vidguky_count}")
        print(f"   Unique commenters found: {len(all_commenters)}")
        
        # Load existing parsed_members and merge
        parsed_file = 'parsed_members.json'
        try:
            with open(parsed_file, 'r', encoding='utf-8') as f:
                existing = json.load(f)
            existing_ids = {m['id'] for m in existing}
            new_count = 0
            for uid, udata in all_commenters.items():
                if udata['id'] not in existing_ids:
                    existing.append(udata)
                    new_count += 1
            print(f"   NEW commenters (not in parsed_members): {new_count}")
            
            with open(parsed_file, 'w', encoding='utf-8') as f:
                json.dump(existing, f, ensure_ascii=False, indent=2)
            print(f"   Saved to {parsed_file} (total: {len(existing)})")
        except FileNotFoundError:
            with open(parsed_file, 'w', encoding='utf-8') as f:
                json.dump(list(all_commenters.values()), f, ensure_ascii=False, indent=2)
            print(f"   Saved {len(all_commenters)} users to {parsed_file}")
        
        # Also merge into merged_users.json
        merged_file = 'merged_users.json'
        try:
            with open(merged_file, 'r', encoding='utf-8') as f:
                merged = json.load(f)
            merged_ids = {m['id'] for m in merged}
            merged_new = 0
            for uid, udata in all_commenters.items():
                if udata['id'] not in merged_ids:
                    merged.append(udata)
                    merged_new += 1
            with open(merged_file, 'w', encoding='utf-8') as f:
                json.dump(merged, f, ensure_ascii=False, indent=2)
            print(f"   Merged into {merged_file} (+{merged_new} new, total: {len(merged)})")
        except FileNotFoundError:
            pass
        
        print(f"{'='*60}")
        
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
