# لوحة الطقس — Weather Dashboard

موقع لتتبّع حالة الطقس لأي مدينة في العالم مع توقعات لـ 5 أيام قادمة، مبني بـ HTML/CSS/JavaScript خالص (بدون فريمووركات) ومتصل بـ [OpenWeatherMap API](https://openweathermap.org/api).

**🔗 Live Demo:** _(ضيف رابط Vercel هنا بعد الرفع)_

## المميزات

- تصميم Dashboard متجاوب (Grid/Flexbox) يشتغل من الموبايل لحد الشاشات الكبيرة.
- بحث باسم أي مدينة، مع كارت رئيسي لطقس اليوم (حرارة، رطوبة، رياح، ضغط، رؤية).
- 5 كروت لتوقعات الأيام الجاية.
- معالجة أخطاء واضحة: اسم مدينة غلط، مفتاح API غلط، مشكلة في الاتصال.
- حفظ آخر 3 مدن في `localStorage` كأزرار بحث سريع.
- زرار لجلب طقس موقعك الحالي عبر Geolocation.

## التشغيل محليًا

1. احصل على مفتاح API مجاني من [openweathermap.org/api](https://openweathermap.org/api) (تفعيل المفتاح ممكن ياخد لحد ساعتين بعد التسجيل).
2. افتح `script.js` وحط المفتاح مكان:
   ```js
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
   ```
3. افتح `index.html` في المتصفح مباشرة، أو شغّل سيرفر بسيط:
   ```bash
   npx serve .
   ```

> ⚠️ **ملحوظة أمان:** حط مفتاح الـ API مباشرة في الكود مقبول لمشروع تعليمي/تجريبي بسيط، لكن متعملوش commit لمفتاح حقيقي في repo عام. للمشاريع الحقيقية، اعمل serverless function (زي Vercel Function) تخبي المفتاح كـ Environment Variable وتنادي عليها من الفرونت إند بدل ما تكشفه في كود الكلاينت.

## رفع المشروع على GitHub

```bash
cd weather-dashboard
git init
git add .
git commit -m "Initial commit: project structure"
git branch -M main
git remote add origin https://github.com/<username>/weather-dashboard.git
git push -u origin main
```

بعد كده، كمّل شغل بـ commits منفصلة وواضحة، مثلاً:

```bash
git commit -m "Add current weather card and search"
git commit -m "Add 5-day forecast rendering"
git commit -m "Add localStorage recent cities"
git commit -m "Add geolocation weather button"
git commit -m "Polish responsive layout"
```

## الرفع على Vercel

1. روح [vercel.com](https://vercel.com) وسجّل دخول بحساب GitHub بتاعك.
2. اضغط **Add New → Project** واختار الـ repo `weather-dashboard`.
3. المشروع static (HTML/CSS/JS) فمفيش Build Command مطلوب — Vercel هيتعرف عليه أوتوماتيك كـ Static Site (سيبها Framework Preset = Other).
4. اضغط **Deploy**.
5. بعد ما يخلص، هتلاقي رابط الـ Live Demo (زي `weather-dashboard.vercel.app`) — انسخه وحطه فوق في أول سطر بالـ README، واعمل commit وpush تاني.

## بنية المشروع

```
weather-dashboard/
├── index.html   # الهيكل
├── style.css    # التصميم
├── script.js    # منطق الـ API والتفاعلية
└── README.md
```
