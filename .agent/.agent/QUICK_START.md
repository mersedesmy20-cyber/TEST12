# 📱 Швидкий старт реклами (5 хвилин)

## Крок 1: Налаштувати Google Analytics (2 хв)

1. **Перейти на** [analytics.google.com](https://analytics.google.com)
2. **Створити акаунт:**
   - Account name: `Glorious Travel`
   - Property name: `Website`
   - Time zone: `(GMT+02:00) Kyiv`
   - Currency: `USD`
3. **Вибрати:** Web → URL: `test-12-green.vercel.app`
4. **Скопіювати Measurement ID** (формат: `G-XXXXXXXXXX`)
5. **Відкрити Vercel:**
   - vercel.com → Ваш проект → Settings → Environment Variables
   - Додати: `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
   - Save
6. **Redeploy** (Deployments → ... → Redeploy)

✅ **Готово!** Через 5-10 хвилин дані почнуть надходити.

---

## Крок 2: Створити перше оголошення в Google Ads (3 хв)

1. **Перейти на** [ads.google.com](https://ads.google.com)
2. **Створити campaign:**
   - Goal: `Leads`
   - Campaign type: `Search`
   - Name: `Glorious Travel - Tury`
3. **Budget:** $10/day
4. **Location:** Ukraine → Kyiv
5. **Language:** Ukrainian
6. **Створити Ad Group:**
   - Name: `Egypt Tours`
   - Keywords: `тури єгипет`, `єгипет київ`, `тури all inclusive`
7. **Написати оголошення** (скопіювати з `.agent/AD_TEMPLATES.md`):
   ```
   Заголовок 1: Тури в Єгипет від 450€
   Заголовок 2: Glorious Travel | Київ
   Опис: ✈️ Хургада, Шарм. All Inclusive. Консультація 24/7.
   URL: test-12-green.vercel.app
   ```
8. **Publish!**

✅ **Готово!** Ваше оголошення на модерації (до 24 годин).

---

## Крок 3 (опціонально): Facebook/Instagram реклама

1. **Business Manager:** [business.facebook.com](https://business.facebook.com)
2. **Create Ad** → Objective: `Traffic` або `Messages`
3. **Budget:** $5/day
4. **Audience:**
   - Location: Kyiv, Ukraine
   - Age: 25-55
   - Interests: Travel, Vacation, All-Inclusive Resorts
5. **Upload photo** (пляж, готель) + текст з `.agent/AD_TEMPLATES.md`
6. **Launch!**

---

## ⚡ Експрес чек-лист

- [ ] Google Analytics ID додано в Vercel
- [ ] Перше оголошення в Google Ads запущено
- [ ] Сайт працює: [test-12-green.vercel.app](https://test-12-green.vercel.app)
- [ ] Telegram @lizazakharchenko відповідає
- [ ] Instagram профіль активний

---

## 📊 Що відстежувати перший тиждень

1. **Google Analytics** → Real-Time: скільки людей на сайті прямо зараз
2. **Google Ads** → Campaigns: скільки кліків отримали
3. **Telegram:** скільки запитів отримали

**Мета перший тиждень:**
- 50-100 відвідувачів
- 5-10 заявок
- CPC < $1

---

## ❓ Що робити далі

📖 Детальні інструкції: `.agent/DEPLOYMENT_CHECKLIST.md`  
📣 Приклади оголошень: `.agent/AD_TEMPLATES.md`  
🚀 Повний гайд: `.agent/LAUNCH_GUIDE.md`

---

**Все готово! 🎉 Можна запускати рекламу!**
