# SOFT STORE — متجر سوفت

منصة متجر إلكتروني كامل لمتجر **SOFT Boutique** — لأناقة وراحة المرأة السورية.
مكونة من واجهة أمامية (Frontend) ونظام إدارة خلفي (Backend).

---

## 💡 شنو هذا المشروع؟

المشروع عبارة عن **متجر إلكتروني** يشوفه الزبون (الواجهة) ويسوي منه طلب،
بالاضافة الى **نظام إدارة** (Admin) تقدر من خلاله تضيف وتعدل وتحذف المنتجات والاقسام وكل شيء.

```
الزبون → الموقع (http://localhost:3000) → يشوف المنتجات ويطلب واتساب
الادمن → API (http://localhost:5000) → يضيف منتجات، يعدل، يشوف الرسائل
```

---

## 🧱 شلون المشروع شغال؟

### الواجهة (Frontend) — React + Vite
- موجودة بمجلد `frontend/`
- كل جزء من الموقع له ملف خاص بالـ `components/`:
  - `Navbar.jsx` — القائمة العلوية
  - `Hero.jsx` — القسم الرئيسي (أول شيء يظهر)
  - `Marquee.jsx` — الشريط المتحرك
  - `Products.jsx` — عرض المنتجات والفلترة
  - `About.jsx` — قسم "من نحن"
  - `Storefront.jsx` — معلومات المعرض
  - `Contact.jsx` — نموذج التواصل
  - `Footer.jsx` — تذييل الصفحة + زر واتساب
- التنسيقات كلها بـ **Tailwind CSS** (كلاسات جاهزة)
- معلومات المتجر ثابتة بملف `src/lib/brand.js` (رقم الهاتف، الواتساب، الانستغرام...)

### النظام الخلفي (Backend) — Node.js + Express
- موجود بمجلد `backend/`
- يتطلب **MongoDB** قاعدة بيانات (لو ماكو، السيرفر يشتغل عادي لكن بدون داتا)
- يوفر API للتحكم بالمنتجات والاقسام والرسائل وصور المتجر

### في吉尔 (Config) مهمة
- `backend/.env` — اعدادات قاعدة البيانات ومفتاح JWT وبيانات الادمن
- `frontend/vite.config.js` — اعدادات السيرفر المحلي والـ Proxy

---

## 🚀 شلون تشغله على جهازك؟

### 1. حمل Node.js
من الموقع الرسمي: https://nodejs.org (آخر إصدار)

### 2. نصب المكتبات
افتح التيرمينال بمسار المشروع `/SOFT-STORE` وشغل:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. شغّل السيرفرات

نافذة أولى — الباك ايند:
```bash
cd backend && npm run dev
```
يشتغل على `http://localhost:5000`

نافذة ثانية — الفرونت ايند:
```bash
cd frontend && npm run dev
```
يشتغل على `http://localhost:3000`

> فتح المتصفح على `http://localhost:3000` وشوف الموقع شغال.

---

## ✏️ شلون تعدل بالمشروع؟

### تغيير معلومات المتجر (الهاتف، الواتساب، العنوان...)
افتح `frontend/src/lib/brand.js` وعدل القيم.

```js
export const BRAND = {
  phone: '0962226361',
  whatsapp: '963962226361',
  instagram: 'https://instagram.com/soft.boutique',
  address: 'سوريا — متجر سوفت الفاخر',
  // ... الخ
}
```

### تغيير النصوص والصور
كل ملف في `components/` يحتوي على قسم معين. مثلاً:
- عشان تعدل نص القسم الرئيسي → `Hero.jsx`
- عشان تضيف منتج وهمي → `Products.jsx` عند `SAMPLE_PRODUCTS`
- عشان تعدل بطاقة الميزات → `About.jsx` عند `features`

### تغيير الألوان والتصميم
افتح `tailwind.config.js` — فيه قسم `colors` تحت `brand`. الألوان المستعملة:

```
brand-burgundy     → #5E1224  (العنابي الغامق)
brand-pink         → #F3E1E5  (الوردي الفاتح)
brand-pink-deep    → #E91E63  (الوردي القوي)
```

### إضافة أنميشن
المشروع يستخدم مكتبة `framer-motion`. تقدر تضيف حركات مثل:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  المحتوى
</motion.div>
```

`whileInView` تشتغل لما المستخدم يوصل للقسم بالتمرير.

---

## ☁️ شلون ترفع الموقع عالنت؟ (Deploy)

### الخيار الأول: رفع الموقع كامل ع VPS (سيرفر خاص)

1. **جهز الباك ايند للانتاج:**
   - بدل `MONGODB_URI` في `backend/.env` برابط قاعدة بيانات MongoDB Atlas (مجاني)
   - بدل `JWT_SECRET` بمفتاح سري قوي
   - غير `ADMIN_EMAIL` و `ADMIN_PASSWORD`

2. **ابني الفرونت ايند:**
   ```bash
   cd frontend && npm run build
   ```
   راح ينتج مجلد `frontend/dist/`

3. **اخدم الملفات من الباك ايند:**
   أضف هالسطرين بآخر ملف `backend/server.js` قبل `app.listen`:
   ```js
   app.use(express.static(path.join(__dirname, '../frontend/dist')))
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
   })
   ```

4. **ارفع المجلد كامل عالسيرفر** وشغل:
   ```bash
   cd backend && npm start
   ```

### الخيار الثاني: رفع ع خدمات سحابية

**للـ Frontend (مجاني):**
- **Vercel** (افضل خيار): ارفع مجلد `frontend/` مباشرة
- **Netlify**: اسحب `frontend/dist/` بعد ما تبني الموقع
- الارتباط الحاصل `/api` راح يحتاج تتعدله عشان يشير للسيرفر

**للـ Backend:**
- **Railway.app** / **Render.com** / **Fly.io** — ترفع مجلد `backend/` عليهم
- لازم تضيف متغيرات البيئة (Environment Variables) من ملف `.env`
- فيهم MongoDB مجاني مضمن أو تستخدم **MongoDB Atlas** مجاناً

**مجرّبة ورخيصة:**
- **Railway** يعطي 500 ساعة مجاناً شهرياً (يكفي لمتجر صغير)
- **MongoDB Atlas** يعطي 512 MB مجاناً

---

## 📁 هيكل المشروع كامل

```
SOFT-STORE/
├── frontend/                     # الواجهة
│   ├── public/
│   ├── src/
│   │   ├── components/           # أجزاء الموقع
│   │   ├── lib/brand.js          # معلومات المتجر
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css             # التنسيقات
│   ├── index.html
│   ├── tailwind.config.js        # ألوان وتخصيص
│   └── package.json
├── backend/                      # النظام الخلفي
│   ├── config/db.js              # اتصال قاعدة البيانات
│   ├── controllers/              # منطق كل قسم
│   ├── models/                   # هيكل البيانات
│   ├── routes/                   # مسارات API
│   ├── middleware/               # التحقق وحفظ الصور
│   ├── server.js                 # نقطة البداية
│   └── .env                      # الاعدادات
├── package.json
└── README.md
```

---

## 🛠 API — نهاية المسارات

### تسجيل الدخول
```
POST /api/auth/login
{ "email": "admin@softstore.com", "password": "admin123456" }
← { "token": "..." }
```

### المنتجات
```
GET    /api/products              ← كل المنتجات
GET    /api/products/:id          ← منتج معين
POST   /api/products              ← إضافة منتج (يحتاج توكن)
PUT    /api/products/:id          ← تعديل منتج (يحتاج توكن)
DELETE /api/products/:id          ← حذف منتج (يحتاج توكن)
```

### الأقسام
```
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
```

### الرسائل
```
POST   /api/contact               ← إرسال رسالة (عام)
GET    /api/contact               ← عرض الرسائل (يحتاج توكن)
```

### صورة المتجر
```
GET    /api/brand                 ← معلومات المتجر
PUT    /api/brand                 ← تحديث (يحتاج توكن)
POST   /api/upload                ← رفع صورة (يحتاج توكن)
```

---

## 📌 نصائح سريعة

- **كلما تغير ملف** بالـ frontend والـ Vite شغال — الموقع يتحدث تلقائياً (HMR)
- **عشان توقف السيرفر** — كبس `Ctrl+C` بالتيرمينال
- **لو صار خطأ** — أول شيء تأكد إن الباك ايند شغال على port 5000
- **لو ماكو MongoDB** — الموقع يشتغل عادي لكن يستخدم المنتجات الوهمية (SAMPLE_PRODUCTS)
- **للتجربة المحلية** ما تحتاج قاعدة بيانات — كلشي شغال من دونها

---

## 📞 دعم فني

- **بوت واتساب**: [wa.me/963962226361](https://wa.me/963962226361)
- **انستغرام**: [@soft.boutique](https://instagram.com/soft.boutique)

---

تم التطوير باستخدام ❤️ لمتجر **SOFT Boutique**
