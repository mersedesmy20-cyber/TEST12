"""
Extract user IDs from drag2battery-bot and convert them to the format needed for inviter.py
"""
import json
import sys
import io

# Fix encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def extract_bot_users():
    """Extract user IDs from bot files"""
    
    bot_folder = r'C:\Users\Merse\OneDrive\Desktop\drag2battery-bot'
    
    user_ids = set()
    
    # Load from user_settings.json
    try:
        with open(f'{bot_folder}\\user_settings.json', 'r', encoding='utf-8') as f:
            settings = json.load(f)
            for user_id in settings.keys():
                user_ids.add(int(user_id))
        print(f"✅ Знайдено {len(user_ids)} користувачів в user_settings.json")
    except FileNotFoundError:
        print("⚠️ user_settings.json не знайдено")
    except Exception as e:
        print(f"❌ Помилка при читанні user_settings.json: {e}")
    
    # Load from user_ratings.json
    try:
        with open(f'{bot_folder}\\user_ratings.json', 'r', encoding='utf-8') as f:
            ratings = json.load(f)
            for user_id in ratings.keys():
                user_ids.add(int(user_id))
        print(f"✅ Всього унікальних користувачів: {len(user_ids)}")
    except FileNotFoundError:
        print("⚠️ user_ratings.json не знайдено")
    except Exception as e:
        print(f"❌ Помилка при читанні user_ratings.json: {e}")
    
    if not user_ids:
        print("\n❌ Не знайдено жодного користувача!")
        return
    
    # Convert to the format expected by inviter.py
    bot_users = []
    for user_id in user_ids:
        bot_users.append({
            'id': user_id,
            'username': '',  # Unknown
            'first_name': '',  # Unknown
            'last_name': '',  # Unknown
            'phone': ''  # Unknown
        })
    
    # Save to bot_users.json
    output_file = 'bot_users.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(bot_users, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*50}")
    print(f"✅ Успішно витягнуто {len(bot_users)} користувачів бота!")
    print(f"📝 Збережено в: {output_file}")
    print(f"\nСписок User ID:")
    for user in bot_users:
        print(f"  • {user['id']}")
    print(f"{'='*50}\n")

if __name__ == '__main__':
    extract_bot_users()
