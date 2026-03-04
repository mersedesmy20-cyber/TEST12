import re
import os

base = r'c:\Users\Merse\OneDrive\Desktop\telegram-auto-invite'
log_file = os.path.join(base, 'invite_log.txt')

with open(log_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

success = 0
peer_flood = 0
mutual_contact = 0
too_many_channels = 0
user_privacy = 0
other_errors = 0
disconnected = 0
db_locked = 0
already_added = 0

for line in lines:
    if 'Successfully added' in line or 'Успішно додано' in line:
        success += 1
    elif 'PEER_FLOOD' in line and ('trigger' not in line and 'Stopping' not in line and 'prevent' not in line):
        peer_flood += 1
    elif 'mutual contact' in line or 'взаємний контакт' in line or 'Не контакт' in line:
        mutual_contact += 1
    elif 'too many channels' in line or 'too many' in line.lower():
        too_many_channels += 1
    elif 'privacy' in line.lower():
        user_privacy += 1
    elif 'disconnected' in line.lower():
        disconnected += 1
    elif 'database is locked' in line:
        db_locked += 1
    elif 'вже був доданий' in line or 'already' in line.lower():
        already_added += 1

print('=' * 55)
print('   FULL LOG ANALYSIS')
print('=' * 55)
print(f'  Success (added):              {success}')
print(f'  PEER_FLOOD (ban):             {peer_flood}')
print(f'  Mutual contact required:      {mutual_contact}')
print(f'  Too many channels:            {too_many_channels}')
print(f'  User privacy restrictions:    {user_privacy}')
print(f'  Disconnected errors:          {disconnected}')
print(f'  Database locked:              {db_locked}')
print(f'  Already added (skipped):      {already_added}')
print('=' * 55)
print(f'  TOTAL actions logged:         {success + peer_flood + mutual_contact + too_many_channels + user_privacy + disconnected + db_locked + already_added}')
print('=' * 55)

# Find last successful log date
last_date = None
for line in reversed(lines):
    if 'Successfully added' in line or 'Успішно додано' in line:
        match = re.search(r'\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]', line)
        if match:
            last_date = match.group(1)
            last_user = line.strip()
            break

print(f'\nLast successful invite:')
print(f'  {last_date}')
print(f'  {last_user}')

# First date
for line in lines:
    match = re.search(r'\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]', line)
    if match:
        print(f'\nFirst log entry: {match.group(1)}')
        break

# Last date
for line in reversed(lines):
    match = re.search(r'\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]', line)
    if match:
        print(f'Last log entry:  {match.group(1)}')
        break
