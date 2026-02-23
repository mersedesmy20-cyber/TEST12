"""
Script to parse all contacts from your Telegram account.
These are people who already know you, so inviting them is safer.
"""
import json
import asyncio
import sys
import io
from telethon import TelegramClient
from telethon.tl.functions.contacts import GetContactsRequest
import config

# Fix encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

async def parse_contacts():
    """Parse all contacts from your Telegram account"""
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        print("✅ Successfully connected to Telegram")
        
        # Get all contacts
        result = await client(GetContactsRequest(hash=0))
        
        contacts = []
        
        print(f"\n📋 Found {len(result.users)} contacts\n")
        
        for user in result.users:
            # Skip bots, deleted accounts, and yourself
            if user.bot or user.deleted or user.is_self:
                continue
                
            contact_info = {
                'id': user.id,
                'username': user.username if user.username else '',
                'first_name': user.first_name if user.first_name else '',
                'last_name': user.last_name if user.last_name else '',
                'phone': user.phone if user.phone else ''
            }
            
            contacts.append(contact_info)
            
            display_name = user.username if user.username else f"{user.first_name} {user.last_name}"
            print(f"  ✓ {display_name}")
        
        # Save to JSON file
        output_file = 'contacts.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(contacts, f, ensure_ascii=False, indent=2)
        
        print(f"\n{'='*50}")
        print(f"✅ Successfully parsed {len(contacts)} contacts")
        print(f"📝 Saved to: {output_file}")
        print(f"{'='*50}\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(parse_contacts())
