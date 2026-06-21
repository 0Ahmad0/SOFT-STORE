# دليل تشغيل المشروع — SOFT STORE

## متطلبات قبل البدء
- Node.js v18+ منصب عندك ✅
- MongoDB شغال على جهازك ✅

---

## 1. صلاحية PowerShell (مرة واحدة فقط)
شغل هذا الأمر:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## 2. تشغيل الباك ايند (Backend)

نافذة تيرمينال رقم 1:
```bash
cd backend
npm run dev
```
📌 يشتغل على **http://localhost:5000**

---

## 3. تشغيل الفرونت ايند (Frontend)

نافذة تيرمينال رقم 2 (حطها جنب الأولى):
```bash
cd frontend
npm run dev
```
📌 يشتغل على **http://localhost:3000**

---

## 4. تعبئة البيانات التجريبية (Seed)

نافذة تيرمينال رقم 3 — مرة واحدة فقط:
```bash
cd backend
npm run seed
```
هذا الأمر يضيف:
- 7 أقسام (لانجري، حجابات، تجهيز عرائس...)
- 6 منتجات تجريبية
- معلومات المتجر الأساسية

---

## 5. تسجيل الدخول للوحة الإدارة

استخدم **Postman** أو **Thunder Client** (إضافة VS Code):

```
POST http://localhost:5000/api/auth/login
```

Body (JSON):
```json
{
  "email": "admin@softstore.com",
  "password": "admin123456"
}
```

الرد راح يعطيك **Token**، احتفظ فيه.

---

## 6. أهم مسارات API

### المنتجات
| الطريقة | المسار | الشرح |
|---------|--------|-------|
| GET | `http://localhost:5000/api/products` | عرض كل المنتجات |
| GET | `http://localhost:5000/api/products/:id` | منتج معين |
| POST | `http://localhost:5000/api/products` | إضافة منتج 🔒 |
| PUT | `http://localhost:5000/api/products/:id` | تعديل منتج 🔒 |
| DELETE | `http://localhost:5000/api/products/:id` | حذف منتج 🔒 |

### الأقسام
| الطريقة | المسار | الشرح |
|---------|--------|-------|
| GET | `http://localhost:5000/api/categories` | عرض الأقسام |
| POST | `http://localhost:5000/api/categories` | إضافة قسم 🔒 |
| PUT | `http://localhost:5000/api/categories/:id` | تعديل قسم 🔒 |

### الرسائل
| الطريقة | المسار | الشرح |
|---------|--------|-------|
| POST | `http://localhost:5000/api/contact` | إرسال رسالة (عام) |
| GET | `http://localhost:5000/api/contact` | عرض الرسائل 🔒 |

🔒 = يحتاج توكن (Auth Bearer Token)

---

## 7. كيف تضيف توكن في الطلب
حط هيدر بقيمة:
```
Authorization: Bearer <التوكن_اللي_جاك_من_تسجيل_الدخول>
```

---

## 8. مثال: إضافة منتج جديد
```
POST http://localhost:5000/api/products
Authorization: Bearer <توكنك>
Content-Type: application/json
```
```json
{
  "name": "اسم المنتج",
  "category": "لانجري",
  "price": "حسب القياس",
  "description": "وصف المنتج",
  "image": "رابط الصورة",
  "badge": "جديد",
  "featured": true
}
```

---

## 9. إيقاف السيرفرات
كبس **Ctrl+C** في أي نافذة تيرمينال.

---

## ملاحظات
- **بدون قاعدة بيانات**: الموقع يشتغل عادي لكن يستخدم منتجات وهمية (Sample Products)
- **تعديل معلومات المتجر**: افتح `frontend/src/lib/brand.js`
- **تعديل ألوان الموقع**: افتح `frontend/tailwind.config.js` تحت `colors.brand`
- **بيانات الدخول**: موجودة في `backend/.env` (عدلها وقت الرفع عالنت)
