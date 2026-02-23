"""
Автоматичний моніторинг каналів та додавання активних користувачів
Відстежує повідомлення та коментарі
"""
import json
import asyncio
import sys
import io
from datetime import datetime
from telethon import TelegramClient, events
from telethon.errors import (
    FloodWaitError, UserPrivacyRestrictedError,
    UserNotMutualContactError, UserChannelsTooMuchError,
    UserBannedInChannelError, PeerFloodError
)
from telethon.tl.functions.channels import InviteToChannelRequest
import config

# Виправлення кодування для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Файл для збереження вже доданих користувачів
ADDED_USERS_FILE = 'added_users.json'

# Канали для моніторингу
MONITOR_CHANNELS = [
    -1002419686297,  # їжак🍕
    -1001097206587,  # ЧАТ DTP KIEV CHAT
]

class AutoInviteBot:
    """Бот для автоматичного додавання активних користувачів"""
    
    def __init__(self):
        self.client = TelegramClient(config.SESSION_FILE, config.API_ID, config.API_HASH)
        self.added_users = self.load_added_users()
        self.target_channel = None
        self.source_channels = []
    
    def load_added_users(self):
        """Завантажує список вже доданих користувачів"""
        try:
            with open(ADDED_USERS_FILE, 'r', encoding='utf-8') as f:
                return set(json.load(f))
        except FileNotFoundError:
            return set()
    
    def save_added_users(self):
        """Зберігає список доданих користувачів"""
        with open(ADDED_USERS_FILE, 'w', encoding='utf-8') as f:
            json.dump(list(self.added_users), f, ensure_ascii=False, indent=2)
    
    def log(self, message):
        """Логування з часовою міткою"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_message = f"[{timestamp}] {message}"
        print(log_message)
        
        # Також записуємо в файл
        with open(config.LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(log_message + '\n')
    
    async def add_user_to_channel(self, user):
        """Додає користувача до цільового каналу"""
        user_id = user.id
        username = user.username or f"user_{user_id}"
        
        # Перевіряємо чи не додавали раніше
        if user_id in self.added_users:
            return False
        
        # Пропускаємо ботів (якщо це User, а не Channel)
        if hasattr(user, 'bot') and user.bot:
            self.log(f"🤖 @{username} - бот, пропускаємо")
            return False
        
        try:
            # Додаємо користувача
            await self.client(InviteToChannelRequest(
                self.target_channel,
                [user]
            ))
            
            self.added_users.add(user_id)
            self.save_added_users()
            self.log(f"✅ @{username} успішно доданий до каналу")
            return True
            
        except FloodWaitError as e:
            self.log(f"⏳ FloodWait: чекаємо {e.seconds} секунд...")
            await asyncio.sleep(e.seconds)
            return False
            
        except UserPrivacyRestrictedError:
            self.log(f"❌ @{username} - приватність")
            self.added_users.add(user_id)
            self.save_added_users()
            return False
            
        except UserNotMutualContactError:
            self.log(f"❌ @{username} - не контакт")
            self.added_users.add(user_id)
            self.save_added_users()
            return False
            
        except UserChannelsTooMuchError:
            self.log(f"❌ @{username} - багато каналів")
            self.added_users.add(user_id)
            self.save_added_users()
            return False
            
        except UserBannedInChannelError:
            self.log(f"❌ @{username} - забанений")
            self.added_users.add(user_id)
            self.save_added_users()
            return False
            
        except PeerFloodError:
            self.log(f"🚫 PEER_FLOOD - акаунт обмежений! Зупиніть на 24 години")
            return False
            
        except Exception as e:
            self.log(f"❌ @{username} - помилка: {str(e)}")
            return False
    
    async def start(self):
        """Запуск бота"""
        # Підключення
        await self.client.start(phone=config.PHONE, password=config.PASSWORD_2FA)
        self.log("✅ Успішно підключено до Telegram")
        
        # Отримуємо цільовий канал
        try:
            self.target_channel = await self.client.get_entity(config.TARGET_CHANNEL_ID)
            self.log(f"🎯 Додаємо до каналу: {self.target_channel.title}")
        except Exception as e:
            self.log(f"❌ Помилка отримання цільового каналу: {e}")
            return
        
        # Отримуємо канали для моніторингу
        for channel_id in MONITOR_CHANNELS:
            try:
                channel = await self.client.get_entity(channel_id)
                self.source_channels.append(channel)
                self.log(f"👀 Моніторимо: {channel.title}")
            except Exception as e:
                self.log(f"⚠️ Не вдалось додати канал {channel_id}: {e}")
        
        self.log(f"📊 Вже додано користувачів: {len(self.added_users)}")
        self.log("🚀 Бот запущено! Очікуємо нові повідомлення та коментарі...\n")
        
        # Обробник нових повідомлень та коментарів
        @self.client.on(events.NewMessage(chats=self.source_channels))
        async def handler(event):
            """Обробляє нові повідомлення та коментарі"""
            try:
                # Отримуємо відправника
                sender = await event.get_sender()
                
                if sender:
                    username = sender.username or f"user_{sender.id}"
                    
                    # Визначаємо тип повідомлення
                    message_type = "коментар" if event.is_reply else "повідомлення"
                    self.log(f"📨 Нове {message_type} від @{username}")
                    
                    # Додаємо користувача
                    success = await self.add_user_to_channel(sender)
                    
                    if success:
                        # Затримка після успішного додавання
                        delay = 60
                        self.log(f"💤 Чекаємо {delay}с перед наступним додаванням...\n")
                        await asyncio.sleep(delay)
                        
            except Exception as e:
                self.log(f"❌ Помилка обробки: {e}")
        
        # Запускаємо event loop
        self.log("⏰ Бот працює. Ctrl+C для зупинки.\n")
        await self.client.run_until_disconnected()

async def main():
    """Головна функція"""
    bot = AutoInviteBot()
    try:
        await bot.start()
    except KeyboardInterrupt:
        print("\n\n⛔ Бот зупинено користувачем")
    except Exception as e:
        print(f"\n❌ Критична помилка: {e}")

if __name__ == '__main__':
    asyncio.run(main())
