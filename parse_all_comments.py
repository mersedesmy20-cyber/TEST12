"""
Parse ALL comments from the channel for the entire history.
Gets every unique commenter from every post.
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

os.chdir(r'c:\Users\Merse\OneDrive\Desktop\telegram-auto-invite')

from telethon import TelegramClient
from telethon.tl.functions.messages import GetRepliesRequest
from telethon.errors import FloodWaitError

# Account 1 credentials
API_ID = 37818603
API_HASH = 'e5bb6579c64d9066e0930ee9bea9bbcb'
PHONE = '+380939362967'
PASSWORD_2FA = 'AAAaaa111'
SESSION_FILE = 'telegram_session'

# Channel
CHANNEL_ID = -1002419686297

async def main():
    client = TelegramClient(SESSION_FILE, API_ID, API_HASH)
    
    print("=" * 60)
    print("  PARSE ALL COMMENTS FROM CHANNEL")
    print("  Channel ID:", CHANNEL_ID)
    print("=" * 60)
    
    print("\n Connecting to Telegram...")
    await client.start(phone=PHONE, password=PASSWORD_2FA)
    print(" Connected!\n")
    
    try:
        channel = await client.get_entity(CHANNEL_ID)
        print(f" Channel: {channel.title}")
        print(f" Parsing ALL comments from ALL posts...\n")
        
        all_commenters = {}
        post_count = 0
        posts_with_comments = 0
        total_comments = 0
        
        # Load existing commenters to avoid re-fetching
        existing_ids = set()
        parsed_file = 'parsed_members.json'
        try:
            with open(parsed_file, 'r', encoding='utf-8') as f:
                existing = json.load(f)
            existing_ids = {m['id'] for m in existing}
            print(f" Already have {len(existing_ids)} parsed users\n")
        except FileNotFoundError:
            existing = []
        
        async for message in client.iter_messages(channel, limit=None):
            post_count += 1
            
            if post_count % 200 == 0:
                print(f"   ...scanned {post_count} posts | {posts_with_comments} with comments | {len(all_commenters)} NEW unique commenters")
            
            # Skip posts without comments
            if not message.replies or message.replies.replies == 0:
                continue
            
            posts_with_comments += 1
            
            # Get comments for this post
            try:
                offset_id = 0
                post_new = 0
                
                while True:
                    try:
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
                    except FloodWaitError as e:
                        print(f"   FloodWait: waiting {e.seconds}s...")
                        await asyncio.sleep(e.seconds)
                        continue
                    except Exception as e:
                        break
                    
                    if not replies.messages:
                        break
                    
                    for reply in replies.messages:
                        total_comments += 1
                        
                        if not reply.from_id or not hasattr(reply.from_id, 'user_id'):
                            continue
                        
                        user_id = reply.from_id.user_id
                        
                        # Skip if already in our existing list or already found
                        if user_id in existing_ids or user_id in all_commenters:
                            continue
                        
                        try:
                            user = await client.get_entity(user_id)
                            if hasattr(user, 'bot') and user.bot:
                                continue
                            
                            all_commenters[user_id] = {
                                'id': user.id,
                                'username': user.username or '',
                                'first_name': user.first_name or '',
                                'last_name': user.last_name or '',
                                'phone': getattr(user, 'phone', '') or ''
                            }
                            post_new += 1
                        except Exception:
                            pass
                    
                    offset_id = replies.messages[-1].id
                    if len(replies.messages) < 100:
                        break
                    
                    await asyncio.sleep(1)
                
                if post_new > 0:
                    date_str = message.date.strftime('%Y-%m-%d')
                    print(f"   Post #{message.id} ({date_str}): +{post_new} new users")
                
                await asyncio.sleep(0.5)
                
            except Exception as e:
                print(f"   Error on post #{message.id}: {e}")
        
        # Merge with existing
        new_commenters = list(all_commenters.values())
        for c in new_commenters:
            existing.append(c)
        
        # Save parsed_members.json
        with open(parsed_file, 'w', encoding='utf-8') as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
        
        # Also merge into merged_users.json
        merged_file = 'merged_users.json'
        try:
            with open(merged_file, 'r', encoding='utf-8') as f:
                merged = json.load(f)
            merged_ids = {m['id'] for m in merged}
            merged_new = 0
            for c in new_commenters:
                if c['id'] not in merged_ids:
                    merged.append(c)
                    merged_new += 1
            with open(merged_file, 'w', encoding='utf-8') as f:
                json.dump(merged, f, ensure_ascii=False, indent=2)
            print(f"\n   Merged into {merged_file}: +{merged_new} new (total: {len(merged)})")
        except FileNotFoundError:
            pass
        
        print(f"\n{'='*60}")
        print(f"  RESULTS:")
        print(f"  Posts scanned:          {post_count}")
        print(f"  Posts with comments:    {posts_with_comments}")
        print(f"  Total comments parsed:  {total_comments}")
        print(f"  NEW unique commenters:  {len(all_commenters)}")
        print(f"  Total in parsed file:   {len(existing)}")
        print(f"  Saved to: {parsed_file}")
        print(f"{'='*60}\n")
        
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
