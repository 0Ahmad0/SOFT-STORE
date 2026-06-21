# نشر مشروع SOFT Store وربط دومين Namecheap

الخطة الأبسط التي تعمل:

- Frontend على Vercel.
- Backend على Render أو VPS.
- Database على MongoDB Atlas.
- الدومين من Namecheap يربط على Vercel.

> مهم: لا ترفع الباك إند على Vercel بهذه البنية الحالية. المشروع يستخدم Express ورفع صور إلى مجلد `uploads`، وهذا يحتاج سيرفر backend حقيقي. إذا رفعت backend على serverless ستتعب مع الصور.

## 1. جهز قاعدة البيانات MongoDB Atlas

1. ادخل إلى MongoDB Atlas.
2. أنشئ Cluster.
3. أنشئ Database User باسم وكلمة مرور قوية.
4. من Network Access أضف:

```text
0.0.0.0/0
```

5. انسخ connection string، وسيكون قريب من:

```text
mongodb+srv://USER:PASSWORD@cluster.mongodb.net/soft-store?retryWrites=true&w=majority
```

## 2. ارفع الكود على GitHub

من جذر المشروع:

```powershell
git status
git add .
git commit -m "Prepare production deploy"
git push
```

## 3. ارفع Backend على Render

في Render:

1. New > Web Service.
2. اربط GitHub repository.
3. الإعدادات:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

4. أضف Environment Variables:

```text
PORT=5000
MONGODB_URI=ضع رابط MongoDB Atlas هنا
JWT_SECRET=مفتاح طويل وعشوائي
ADMIN_EMAIL=admin@softstore.com
ADMIN_PASSWORD=غيرها لكلمة قوية
UPLOAD_DIR=uploads
NODE_ENV=production
```

5. بعد النشر، سيعطيك Render رابط مثل:

```text
https://soft-store-api.onrender.com
```

اختبر:

```text
https://soft-store-api.onrender.com/api/health
```

إذا ظهر:

```json
{"status":"ok"}
```

الباك إند شغال.

## 4. ملاحظة الصور المهمة

المشروع حاليا يحفظ الصور داخل:

```text
backend/uploads
```

هذا ممتاز على VPS أو سيرفر فيه تخزين دائم. على Render المجاني، الملفات المرفوعة قد لا تكون مضمونة للأبد بعد redeploy/restart.

لإطلاق حقيقي عندك خيارين:

1. VPS: الأفضل لهذا المشروع كما هو.
2. Cloudinary لاحقا: أفضل حل سحابي للصور، لكنه يحتاج تعديل كود.

إذا ستبدأ بسرعة: استخدم Render الآن، واعرف أن الصور تحتاج حل دائم قبل الاعتماد الكامل.

## 5. ارفع Frontend على Vercel

في Vercel:

1. Add New Project.
2. اختر نفس GitHub repository.
3. الإعدادات:

```text
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

4. أضف Environment Variable:

```text
VITE_API_URL=https://soft-store-api.onrender.com
```

استبدل الرابط برابط الباك إند الحقيقي من Render.

5. Deploy.

اختبر الموقع المؤقت من Vercel، ثم جرّب:

```text
/admin/login
```

## 6. اربط دومين Namecheap مع Vercel

في Vercel:

1. افتح Project.
2. Settings > Domains.
3. أضف الدومين:

```text
yourdomain.com
www.yourdomain.com
```

Vercel سيعرض لك DNS records المطلوبة.

في Namecheap:

1. Domain List.
2. Manage بجانب الدومين.
3. Advanced DNS.
4. Host Records.
5. احذف أي record متعارض لنفس `@` أو `www`.
6. أضف records التي يعطيك إياها Vercel.

عادة ستكون بهذا الشكل، لكن اتبع ما يظهر داخل Vercel:

```text
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

```text
Type: CNAME
Host: www
Value: cname.vercel-dns.com أو القيمة التي يعطيها Vercel
TTL: Automatic
```

انتظر من 30 دقيقة إلى عدة ساعات حتى ينتشر DNS.

## 7. اربط API Subdomain اختياري

إذا تريد رابط احترافي للباك إند:

```text
api.yourdomain.com
```

أضفه في Render كـ Custom Domain، ثم خذ DNS record الذي يعطيك Render وضعه في Namecheap غالبا كـ CNAME:

```text
Type: CNAME
Host: api
Value: القيمة التي يعطيها Render
TTL: Automatic
```

بعدها عدّل Vercel environment:

```text
VITE_API_URL=https://api.yourdomain.com
```

ثم أعد Deploy للفرونت.

## 8. فحص نهائي قبل الإعلان

افتح:

```text
https://yourdomain.com
```

وتحقق من:

- الصفحة الرئيسية تظهر.
- المنتجات تظهر.
- الصور تظهر.
- الخريطة صحيحة.
- زر واتساب يعمل.
- `/admin/login` يعمل.
- إضافة تصنيف تظهر مباشرة.
- إضافة منتج مع صورة تظهر مباشرة.
- الرسائل تصل إلى لوحة الأدمن.

## 9. أوامر محلية قبل أي رفع

من جذر المشروع:

```powershell
npm.cmd run build
```

ومن backend:

```powershell
npm.cmd start
```

ثم:

```text
http://localhost:5000/api/health
```

## مصادر رسمية

- Vercel Domains: https://vercel.com/docs/domains/working-with-domains/add-a-domain
- Namecheap DNS Records: https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/
- Render Node Express: https://render.com/docs/deploy-node-express-app
