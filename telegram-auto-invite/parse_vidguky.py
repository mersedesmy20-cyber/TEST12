"""
Парсинг коментарів з постів "Вечірні відгуки" каналу їжак
Шукає ВСІ пости за весь час існування каналу
"""
import json
import asyncio
import sys
import io
from datetime import datetime
from telethon import TelegramClient
from telethon.errors import FloodWaitError
from telethon.tl.functions.messages import GetRepliesRequest
import config

# Виправлення кодування для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Канал їжак
CHANNEL_ID = -1002419686297

# Ключові слова для пошуку постів
SEARCH_KEYWORDS = ['Вечірні відгуки', 'вечірні відгуки', 'Вечірні Відгуки']

async def parse_vidguky():
    """Парсить коментарі з постів 'Вечірні відгуки'"""
    
    client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
    all_commenters = {}
    found_posts = 0
    total_comments = 0
    
    try:
        await client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        print("=" * 60)
        print("  ПАРСИНГ КОМЕНТАРІВ З ПОСТІВ 'Вечірні відгуки'")
        print("=" * 60)
        print()
        print("Успішно підключено до Telegram")
        
        try:
            channel = await client.get_entity(CHANNEL_ID)
            print(f"Канал: {channel.title}")
            print(f"Шукаємо ВСІ пости 'Вечірні відгуки' за весь час...\n")
        except Exception as e:
            print(f"Помилка отримання каналу: {e}")
            return
        
        # Проходимо по ВСІХ повідомленнях каналу (без ліміту)
        message_count = 0
        
        async for message in client.iter_messages(channel, limit=None):
            message_count += 1
            
            # Показуємо прогрес кожні 500 повідомлень
            if message_count % 500 == 0:
                print(f"  Переглянуто {message_count} повідомлень... (знайдено {found_posts} постів)")
            
            # Перевіряємо чи це пост "Вечірні відгуки"
            if message.text:
                is_vidguky = False
                for keyword in SEARCH_KEYWORDS:
                    if keyword in message.text:
                        is_vidguky = True
                        break
                
                if not is_vidguky:
                    continue
                
                # Знайшли пост!
                found_posts += 1
                msg_date = message.date.strftime('%Y-%m-%d')
                reply_count = message.replies.replies if message.replies else 0
                
                print(f"\n  [{found_posts}] Пост #{message.id} від {msg_date} - {reply_count} коментарів")
                
                if reply_count == 0:
                    continue
                
                # Отримуємо ВСІ коментарі до цього поста
                offset_id = 0
                post_commenters = 0
                
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
                        
                        if not replies.messages:
                            break
                        
                        # Збираємо авторів коментарів
                        for reply in replies.messages:
                            if reply.from_id:
                                user_id = None
                                if hasattr(reply.from_id, 'user_id'):
                                    user_id = reply.from_id.user_id
                                
                                if user_id and user_id not in all_commenters:
                                    try:
                                        user = await client.get_entity(user_id)
                                        if hasattr(user, 'bot') and not user.bot:
                                            username = user.username or ''
                                            all_commenters[user_id] = {
                                                'id': user.id,
                                                'username': username,
                                                'first_name': user.first_name or '',
                                                'last_name': user.last_name or '',
                                                'phone': ''
                                            }
                                            post_commenters += 1
                                            name = f"@{username}" if username else f"user_{user_id}"
                                            print(f"      + {name}")
                                    except Exception:
                                        pass
                            
                            total_comments += 1
                        
                        # Перевірка, чи є ще коментарі
                        offset_id = replies.messages[-1].id
                        if len(replies.messages) < 100:
                            break
                        
                        await asyncio.sleep(1)
                        
                    except FloodWaitError as e:
                        print(f"      FloodWait: чекаємо {e.seconds} секунд...")
                        await asyncio.sleep(e.seconds)
                    except Exception as e:
                        print(f"      Помилка: {e}")
                        break
                
                if post_commenters > 0:
                    print(f"      -> Нових користувачів з цього поста: {post_commenters}")
                
                # Затримка між запитами
                await asyncio.sleep(2)
        
        # Зберігаємо результати
        commenters_list = list(all_commenters.values())
        
        # Об'єднуємо з існуючими
        try:
            with open(config.MEMBERS_FILE, 'r', encoding='utf-8') as f:
                existing = json.load(f)
            existing_ids = {m['id'] for m in existing}
            new_count = 0
            for c in commenters_list:
                if c['id'] not in existing_ids:
                    existing.append(c)
                    new_count += 1
            commenters_list = existing
            print(f"\n  Об'єднано з існуючими. Нових: {new_count}")
        except FileNotFoundError:
            pass
        
        with open(config.MEMBERS_FILE, 'w', encoding='utf-8') as f:
            json.dump(commenters_list, f, ensure_ascii=False, indent=2)
        
        print(f"\n{'=' * 60}")
        print(f"  РЕЗУЛЬТАТИ:")
        print(f"  Переглянуто повідомлень:     {message_count}")
        print(f"  Знайдено постів 'Відгуки':   {found_posts}")
        print(f"  Всього коментарів:           {total_comments}")
        print(f"  Унікальних користувачів:     {len(all_commenters)}")
        print(f"  Всього у файлі:             {len(commenters_list)}")
        print(f"  Збережено у:                {config.MEMBERS_FILE}")
        print(f"{'=' * 60}\n")
        
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(parse_vidguky())
