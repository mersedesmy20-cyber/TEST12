"""
Script to merge contacts, bot users, and existing parsed members into one list.
This creates a master list of all potential channel members.
"""
import json
import sys
import io

# Fix encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def load_json(filename):
    """Load JSON file, return empty list if file doesn't exist"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"⚠️ File not found: {filename}")
        return []
    except Exception as e:
        print(f"❌ Error loading {filename}: {e}")
        return []

def merge_users():
    """Merge all user lists and remove duplicates"""
    
    print("📂 Loading user lists...\n")
    
    # Load all lists
    contacts = load_json('contacts.json')
    bot_users = load_json('bot_users.json')
    resident_users = load_json('resident_users.json')
    parsed_members = load_json('parsed_members.json')
    
    print(f"  📋 Contacts: {len(contacts)}")
    print(f"  🤖 Bot users: {len(bot_users)}")
    print(f"  🏘 Residents: {len(resident_users)}")
    print(f"  👥 Parsed members: {len(parsed_members)}")
    
    # Merge all lists
    all_users = contacts + bot_users + resident_users + parsed_members
    
    # Remove duplicates by ID
    unique_users = {}
    for user in all_users:
        user_id = user.get('id')
        if user_id and user_id not in unique_users:
            unique_users[user_id] = user
    
    # Convert back to list
    merged_list = list(unique_users.values())
    
    # Prioritize contacts, bot users, and residents (move them to the front)
    contact_ids = {user['id'] for user in contacts}
    bot_user_ids = {user['id'] for user in bot_users}
    resident_ids = {user['id'] for user in resident_users}
    
    priority_users = []
    regular_users = []
    
    for user in merged_list:
        if user['id'] in contact_ids or user['id'] in bot_user_ids or user['id'] in resident_ids:
            priority_users.append(user)
        else:
            regular_users.append(user)
    
    # Combine: priority users first, then regular users
    final_list = priority_users + regular_users
    
    # Save merged list
    output_file = 'merged_users.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*50}")
    print(f"✅ Merged users successfully!")
    print(f"📊 Total unique users: {len(final_list)}")
    print(f"   🌟 Priority (contacts + bot + residents): {len(priority_users)}")
    print(f"   👤 Regular members: {len(regular_users)}")
    print(f"📝 Saved to: {output_file}")
    print(f"{'='*50}\n")
    print(f"💡 Now update config.py:")
    print(f"   MEMBERS_FILE = 'merged_users.json'")
    print(f"{'='*50}\n")

if __name__ == '__main__':
    merge_users()
