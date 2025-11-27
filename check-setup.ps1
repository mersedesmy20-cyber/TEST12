# Скрипт для перевірки налаштування проекту

Write-Host "=== Перевірка налаштування Glorious Travel ===" -ForegroundColor Cyan
Write-Host ""

# Перевірка Node.js
Write-Host "1. Перевірка Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✓ Node.js встановлено: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js не встановлено!" -ForegroundColor Red
    Write-Host "   Встановіть Node.js з https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Перевірка npm
Write-Host "2. Перевірка npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   ✓ npm встановлено: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ npm не встановлено!" -ForegroundColor Red
    exit 1
}

# Перевірка node_modules
Write-Host "3. Перевірка залежностей..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✓ Залежності встановлені" -ForegroundColor Green
} else {
    Write-Host "   ✗ Залежності не встановлені!" -ForegroundColor Red
    Write-Host "   Запустіть: npm install" -ForegroundColor Yellow
    exit 1
}

# Перевірка порту 3000
Write-Host "4. Перевірка порту 3000..." -ForegroundColor Yellow
$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "   ⚠ Порт 3000 вже використовується" -ForegroundColor Yellow
    Write-Host "   Можливо, сервер вже запущений" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ Порт 3000 вільний" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Все готово! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Для запуску сервера виконайте:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Потім відкрийте браузер:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor White

