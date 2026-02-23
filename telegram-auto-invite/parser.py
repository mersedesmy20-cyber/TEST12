"""
Парсинг учасників з Telegram групи
"""
import json
import asyncio
import sys
import io
from telethon import TelegramClient
from telethon.errors import FloodWaitError, ChannelPrivateError
from telethon.tl.functions.channels import GetParticipantsRequest
from telethon.tl.types import ChannelParticipantsSearch
import config

# Виправлення кодування для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

async def parse_members():
    """Парсить учасників з групи-донора"""
    
    # Підключення до Telegram
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        print("✅ Успішно підключено до Telegram")
        
        # Отримуємо інформацію про групу
        try:
            source_group = await client.get_entity(config.SOURCE_GROUP_ID)
            print(f"📊 Парсимо групу: {source_group.title}")
        except ChannelPrivateError:
            print("❌ Помилка: Група приватна або ви не є її учасником")
            return
        except Exception as e:
            print(f"❌ Помилка отримання групи: {e}")
            return
        
        # Збираємо учасників
        all_participants = []
        offset = 0
        limit = 100
        
        print("🔄 Починаємо парсинг учасників...")
        
        while True:
            try:
                participants = await client(GetParticipantsRequest(
                    channel=source_group,
                    filter=ChannelParticipantsSearch(''),
                    offset=offset,
                    limit=limit,
                    hash=0
                ))
                
                if not participants.users:
                    break
                
                for user in participants.users:
                    # Зберігаємо тільки актуальних користувачів
                    if not user.bot and user.username:
                        user_data = {
                            'id': user.id,
                            'username': user.username,
                            'first_name': user.first_name or '',
                            'last_name': user.last_name or '',
                            'phone': user.phone or ''
                        }
                        all_participants.append(user_data)
                
                offset += len(participants.users)
                print(f"   Зібрано: {len(all_participants)} користувачів...")
                
                # Обмеження кількості
                if config.PARSE_LIMIT and len(all_participants) >= config.PARSE_LIMIT:
                    all_participants = all_participants[:config.PARSE_LIMIT]
                    break
                
                # Затримка між запитами
                await asyncio.sleep(2)
                
            except FloodWaitError as e:
                print(f"⏳ FloodWait: чекаємо {e.seconds} секунд...")
                await asyncio.sleep(e.seconds)
            except Exception as e:
                print(f"❌ Помилка: {e}")
                break
        
        # Зберігаємо результати
        with open(config.MEMBERS_FILE, 'w', encoding='utf-8') as f:
            json.dump(all_participants, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ Парсинг завершено!")
        print(f"📝 Знайдено {len(all_participants)} користувачів з username")
        print(f"💾 Збережено у файл: {config.MEMBERS_FILE}")
        
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(parse_members())
