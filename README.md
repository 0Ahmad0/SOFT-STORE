# SOFT STORE — متجر سوفت

Full-stack e-commerce platform for **SOFT Boutique** — a Syrian luxury lingerie, hijabs, prayer sets, towels, and bridal preparation store.

Built with **React + Vite + Tailwind CSS + Framer Motion** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## Project Structure

```
SOFT-STORE/
├── frontend/                # React SPA (Vite)
│   ├── public/              # Static HTML
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Storefront.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── lib/
│   │   │   └── brand.js     # Constants, API config, sample data
│   │   ├── App.jsx          # Root component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind + RTL + scrollbar
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── backend/                 # Express REST API
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   └── seed.js          # Database seeder
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── contactController.js
│   │   ├── brandController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT verification
│   │   └── upload.js        # Multer image upload
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Contact.js
│   │   └── Brand.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── contacts.js
│   │   ├── brand.js
│   │   └── upload.js
│   ├── uploads/             # Uploaded images
│   ├── server.js            # Express entry
│   ├── .env                 # Environment variables
│   └── package.json
├── package.json             # Root scripts
├── .gitignore
└── README.md
```

---

## Features

### Frontend
- Full **RTL (Right-to-Left)** support for Arabic
- Responsive design (mobile, tablet, desktop)
- Framer Motion animations (navbar, products, modals)
- Product filtering by category with animated grid
- Product detail modal with WhatsApp ordering
- Floating WhatsApp button
- Animated marquee ticker
- Contact form with validation
- Smooth scroll navigation

### Backend (Admin API)
- **RESTful API** with full CRUD for products, categories, contacts, brand settings
- **JWT authentication** for admin
- **Image upload** via Multer (supports jpg, png, gif, webp, svg)
- **Rate limiting** (100 requests per 15 min)
- **MongoDB** with Mongoose ODM
- **Database seeder** with sample products and categories
- Auto-creates default admin account on first run

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **MongoDB** >= 6.0 (local or Atlas)

---

## Quick Start

### 1. Clone & Install Dependencies

```bash
cd SOFT-STORE

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Go back to root
cd ..
```

### 2. Configure Environment

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/soft-store
JWT_SECRET=your_secure_random_secret_key
ADMIN_EMAIL=admin@softstore.com
ADMIN_PASSWORD=your_secure_password
UPLOAD_DIR=uploads
```

### 3. Seed Database (Optional)

```bash
cd backend
npm run seed
```

This populates the database with sample products, categories, and brand settings.

### 4. Start the Backend

```bash
cd backend
npm run dev    # Development with nodemon
# OR
npm start      # Production
```

API runs at `http://localhost:5000`

### 5. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

App runs at `http://localhost:3000`

---

## API Documentation

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/auth/verify` | Yes | Verify token |

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@softstore.com",
  "password": "admin123456"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": { "id": "...", "email": "admin@softstore.com", "name": "مدير المتجر" }
}
```

Use the token in subsequent requests:

```bash
Authorization: Bearer <token>
```

---

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | Get all products |
| GET | `/api/products/:id` | No | Get product by ID |
| POST | `/api/products` | Yes | Create product |
| PUT | `/api/products/:id` | Yes | Update product |
| DELETE | `/api/products/:id` | Yes | Delete product |

#### Query Parameters (GET /api/products)

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category name |
| `featured` | boolean | Filter featured products |
| `active` | boolean | Filter by active status (default: true) |

#### Create/Update Product

```json
{
  "name": "طقم لانجري حرير فاخر",
  "category": "لانجري",
  "price": "حسب القياس",
  "description": "وصف المنتج...",
  "image": "https://example.com/image.jpg",
  "badge": "أكثر مبيعاً",
  "featured": true,
  "active": true,
  "order": 1
}
```

---

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/categories` | No | Get all categories |
| POST | `/api/categories` | Yes | Create category |
| PUT | `/api/categories/:id` | Yes | Update category |
| DELETE | `/api/categories/:id` | Yes | Delete category |

#### Query Parameters (GET /api/categories)

| Param | Type | Description |
|-------|------|-------------|
| `active` | boolean | Filter by active status (default: true) |

---

### Contact Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/contact` | Yes | Get all messages |
| POST | `/api/contact` | No | Submit a message |
| PATCH | `/api/contact/:id/read` | Yes | Mark message as read |
| DELETE | `/api/contact/:id` | Yes | Delete message |

#### Submit Contact (Public)

```json
{
  "name": "اسم الزبون",
  "phone": "09xx xxx xxx",
  "msg": "تفاصيل الطلب أو الاستفسار"
}
```

---

### Brand Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/brand` | No | Get brand settings |
| PUT | `/api/brand` | Yes | Update brand settings |

---

### Image Upload

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/upload` | Yes | Upload image (max 5MB) |

Send as `multipart/form-data` with field name `image`.

Response:

```json
{
  "url": "/uploads/1234567890-image.jpg",
  "filename": "1234567890-image.jpg"
}
```

---

## Building for Production

### Frontend

```bash
cd frontend
npm run build
```

Output is in `frontend/dist/`. Deploy these static files to any web server.

### Backend

```bash
cd backend
npm start
```

Or deploy the whole `backend/` folder to a Node.js hosting platform (Railway, Render, Heroku, VPS, etc.).

### Full-Stack Single Deployment

For production, serve the built frontend from the Express backend. Update `backend/server.js` to serve the static files:

```javascript
// Add after routes
app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite 6, Tailwind CSS 3, Framer Motion 11, Lucide React |
| Backend | Node.js, Express 4, Mongoose 8, JWT, Multer |
| Database | MongoDB |
| Styling | Tailwind CSS with RTL, Arabic fonts (Tajawal, Amiri) |
| Language | Arabic (RTL), English code comments |

---

## License

MIT — built for SOFT Boutique.

---

## Support

For questions or support, contact:
- **WhatsApp**: [wa.me/963962226361](https://wa.me/963962226361)
- **Instagram**: [@soft.boutique](https://instagram.com/soft.boutique)
