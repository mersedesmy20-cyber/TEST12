import json
import os

base = r'c:\Users\Merse\OneDrive\Desktop\telegram-auto-invite'

with open(os.path.join(base, 'parsed_members.json'), 'r', encoding='utf-8') as f:
    parsed = json.load(f)

with open(os.path.join(base, 'added_users.json'), 'r', encoding='utf-8') as f:
    added = json.load(f)

added_set = set(added)
parsed_ids = [m['id'] for m in parsed]
parsed_set = set(parsed_ids)

already = parsed_set & added_set
not_added = parsed_set - added_set

print('=== STATISTICS ===')
print(f'Parsed from channel: {len(parsed)}')
print(f'In added_users.json: {len(added)}')
print(f'Already added: {len(already)}')
print(f'NOT yet added: {len(not_added)}')
print(f'Added %: {len(already)/len(parsed)*100:.1f}%')

# Show some not-added users
not_added_users = [m for m in parsed if m['id'] in not_added]
print(f'\nFirst 10 NOT added:')
for u in not_added_users[:10]:
    name = f"{u.get('first_name','')} {u.get('last_name','')}".strip()
    un = u.get('username', '')
    print(f'  @{un} ({name}) - ID: {u["id"]}')
