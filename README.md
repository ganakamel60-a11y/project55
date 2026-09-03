# لوحة الطقس — Weather Dashboard

موقع لتتبّع حالة الطقس لأي مدينة في العالم مع توقعات لـ 5 أيام قادمة، مبني بـ HTML/CSS/JavaScript خالص (بدون فريمووركات) ومتصل بـ [OpenWeatherMap API](https://openweathermap.org/api).


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


## بنية المشروع 
```
weather-dashboard/
├── index.html   # الهيكل
├── style.css    # التصميم
├── script.js    # منطق الـ API والتفاعلية
└── README.md
```
