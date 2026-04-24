# 🔗 Посилання з UTM-мітками для реклами

Використовуйте ці посилання для запуску рекламних кампаній. Це дозволить Google Analytics точно визначати джерело трафіку.

## 🟢 Google Ads (Пошукова реклама)

**Загальна кампанія (на головну):**
```
https://test-12-green.vercel.app/?utm_source=google&utm_medium=cpc&utm_campaign=brand_search
```

**Реклама гарячих турів:**
```
https://test-12-green.vercel.app/seasonal?utm_source=google&utm_medium=cpc&utm_campaign=hot_tours
```

**Реклама конкретних країн (наприклад, Туреччина):**
```
https://test-12-green.vercel.app/countries/turkey?utm_source=google&utm_medium=cpc&utm_campaign=turkey_holidays
```

---

## 🔵 Facebook / Instagram Ads

**Стрічка новин (Feed):**
```
https://test-12-green.vercel.app/?utm_source=facebook&utm_medium=cpc&utm_campaign=cold_traffic&utm_content=feed_image_1
```

**Instagram Stories (Квіз або Головна):**
```
https://test-12-green.vercel.app/?utm_source=instagram&utm_medium=story&utm_campaign=quiz_promo
```

**Ретаргетинг (для тих, хто вже був на сайті):**
```
https://test-12-green.vercel.app/seasonal?utm_source=facebook&utm_medium=cpc&utm_campaign=retargeting&utm_content=discount_offer
```

---

## ✈️ Telegram / Viber розсилки

**Посилання в Telegram каналі:**
```
https://test-12-green.vercel.app/?utm_source=telegram&utm_medium=social&utm_campaign=channel_post
```

**Особисті повідомлення:**
```
https://test-12-green.vercel.app/?utm_source=messenger&utm_medium=direct&utm_campaign=personal_offer
```

---

## 📊 Як перевірити, чи працює?

1. Перейдіть за будь-яким посиланням вище.
2. Відкрийте **Google Analytics -> Realtime**.
3. У блоці **Event Count by Event Name** ви побачите подію `page_view`.
4. У блоці **Users by First User Source** ви побачите `google`, `facebook` або `telegram`.

💡 **Порада:** Завжди використовуйте UTM-мітки для будь-якої зовнішньої активності!
