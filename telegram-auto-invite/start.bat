@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════╗
echo ║   🤖 Telegram Auto Invite Bot             ║
echo ╚════════════════════════════════════════════╝
echo.
echo Виберіть дію:
echo.
echo [1] Парсинг учасників (parser.py)
echo [2] Додавання учасників (inviter.py)
echo [3] Встановити залежності (pip install)
echo [4] 🔥 АВТО-БОТ - моніторинг (auto_monitor.py)
echo [5] 💬 Парсинг коментарів (parse_comments.py)
echo [6] 📇 Парсинг КОНТАКТІВ (parse_contacts.py)
echo [7] 🤖 Парсинг користувачів БОТА (parse_bot_users.py)
echo [8] 🔀 Об'єднати списки (merge_users.py)
echo [0] Вихід
echo.
set /p choice="Введіть номер: "

if "%choice%"=="1" (
    echo.
    echo 🔄 Запускаємо парсинг...
    python parser.py
    pause
)

if "%choice%"=="2" (
    echo.
    echo 🚀 Запускаємо додавання...
    python inviter.py
    pause
)

if "%choice%"=="3" (
    echo.
    echo 📦 Встановлюємо залежності...
    pip install -r requirements.txt
    pause
)

if "%choice%"=="4" (
    echo.
    echo 🔥 Запускаємо авто-бот моніторингу...
    echo Натисніть Ctrl+C для зупинки
    python auto_monitor.py
    pause
)

if "%choice%"=="5" (
    echo.
    echo 💬 Парсимо коментарі з каналів...
    python parse_comments.py
    pause
)

if "%choice%"=="6" (
    echo.
    echo 📇 Парсимо ваші контакти...
    python parse_contacts.py
    pause
)

if "%choice%"=="7" (
    echo.
    echo 🤖 Парсимо користувачів бота @home_battery_941_bot...
    python parse_bot_users.py
    pause
)

if "%choice%"=="8" (
    echo.
    echo 🔀 Об'єднуємо всі списки користувачів...
    python merge_users.py
    pause
)

if "%choice%"=="0" (
    exit
)
