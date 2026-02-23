"""
Парсинг усіх коментарів з каналів та додавання користувачів
"""
import json
import asyncio
import sys
import io
from telethon import TelegramClient
from telethon.errors import FloodWaitError
from telethon.tl.functions.messages import GetRepliesRequest
import config

# Виправлення кодування для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Канали для парсингу коментарів
CHANNELS_TO_PARSE = [
    -1002419686297,  # їжак🍕
    -1001097206587,  # ЧАТ DTP KIEV CHAT
]

async def parse_comments():
    """Парсить всі коментарі з каналів"""
    
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    all_commenters = {}
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        print("✅ Успішно підключено до Telegram\n")
        
        for channel_id in CHANNELS_TO_PARSE:
            try:
                channel = await client.get_entity(channel_id)
                print(f"📊 Парсимо канал: {channel.title}")
                print(f"   ID: {channel_id}\n")
                
                # Отримуємо всі повідомлення каналу
                message_count = 0
                comment_count = 0
                
                async for message in client.iter_messages(channel, limit=500):
                    message_count += 1
                    
                    # Якщо повідомлення має коментарі
                    if message.replies and message.replies.replies > 0:
                        print(f"   📝 Повідомлення #{message.id} має {message.replies.replies} коментарів")
                        
                        try:
                            # Отримуємо коментарі до цього повідомлення
                            replies = await client(GetRepliesRequest(
                                peer=channel,
                                msg_id=message.id,
                                offset_id=0,
                                offset_date=None,
                                add_offset=0,
                                limit=100,
                                max_id=0,
                                min_id=0,
                                hash=0
                            ))
                            
                            # Збираємо авторів коментарів
                            for reply_message in replies.messages:
                                if reply_message.from_id:
                                    user_id = reply_message.from_id.user_id if hasattr(reply_message.from_id, 'user_id') else None
                                    
                                    if user_id and user_id not in all_commenters:
                                        try:
                                            user = await client.get_entity(user_id)
                                            if not user.bot and user.username:
                                                all_commenters[user_id] = {
                                                    'id': user.id,
                                                    'username': user.username,
                                                    'first_name': user.first_name or '',
                                                    'last_name': user.last_name or '',
                                                    'phone': user.phone or ''
                                                }
                                                comment_count += 1
                                                print(f"      ✅ @{user.username}")
                                        except Exception as e:
                                            pass
                            
                            # Затримка між запитами коментарів
                            await asyncio.sleep(2)
                            
                        except FloodWaitError as e:
                            print(f"   ⏳ FloodWait: чекаємо {e.seconds} секунд...")
                            await asyncio.sleep(e.seconds)
                        except Exception as e:
                            print(f"   ⚠️ Помилка отримання коментарів: {e}")
                
                print(f"\n   📊 Переглянуто повідомлень: {message_count}")
                print(f"   💬 Знайдено унікальних коментаторів: {comment_count}\n")
                
            except Exception as e:
                print(f"❌ Помилка парсингу каналу {channel_id}: {e}\n")
        
        # Зберігаємо результати
        commenters_list = list(all_commenters.values())
        
        # Об'єднуємо з існуючими спарсеними користувачами
        try:
            with open(config.MEMBERS_FILE, 'r', encoding='utf-8') as f:
                existing_members = json.load(f)
            
            existing_ids = {m['id'] for m in existing_members}
            
            # Додаємо тільки нових
            for commenter in commenters_list:
                if commenter['id'] not in existing_ids:
                    existing_members.append(commenter)
            
            commenters_list = existing_members
            print(f"📝 Об'єднано з існуючими користувачами")
            
        except FileNotFoundError:
            pass
        
        with open(config.MEMBERS_FILE, 'w', encoding='utf-8') as f:
            json.dump(commenters_list, f, ensure_ascii=False, indent=2)
        
        print(f"\n{'='*60}")
        print(f"✅ Парсинг завершено!")
        print(f"📝 Всього унікальних користувачів: {len(commenters_list)}")
        print(f"💾 Збережено у файл: {config.MEMBERS_FILE}")
        print(f"{'='*60}\n")
        
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(parse_comments())
