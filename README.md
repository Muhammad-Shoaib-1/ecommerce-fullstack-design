# 🛒 Ecommerce Fullstack App

A full-stack ecommerce web application built with the MERN stack (MongoDB, Express, React, Node.js). Designed from a professional Figma template with both desktop and mobile responsive layouts.

---

## 🖥️ Live Demo

> Frontend: `https://ecommerce-fullstack-design-phi.vercel.app/`
> Backend API: `https://ecommerce-backend-17n9.onrender.com/api`

---

## 📸 Screenshots

| Home Page | Product Listing | Product Detail |
|-----------|----------------|----------------|
| ![Home](./client/images/Home-page.jpg) | ![Listing](./client/images/Products.jpg) | ![Detail](./client/images/Product-Details.jpg) |

| Cart | Admin Panel | Mobile |
|------|-------------|--------|
| ![Cart](./client/images/Cart.jpg) | ![Admin](./client/images/Admin.jpg) | ![Mobile](./client/images/Mobile-responsive.jpg) |

---

## ✨ Features

### Customer
- 🔐 JWT-based authentication (register, login, logout)
- 🏠 Home page with deals, category sections, recommended items, and RFQ banner
- 🔍 Product listing with grid/list view toggle, category filter, price range, sorting, and pagination
- 🛍️ Product detail page with image gallery, specifications, and related products
- 🛒 Cart with quantity control, remove, save for later, and move to cart
- 🏷️ Coupon code support with real-time discount calculation
- 📦 Multi-step checkout (address → payment → confirm)
- 👤 Profile page with address management
- 📋 Order history with order status tracking
- 📞 Contact page with inquiry form and FAQ accordion
- 📱 Fully responsive — desktop and mobile layouts

### Admin
- 📊 Dashboard with key metrics (orders, revenue, users, products)
- 📦 Product management (create, edit, delete, image upload)
- 🗂️ Category management
- 📋 Order management with status updates
- 👥 User management
- 🏷️ Coupon management (percent/flat discount, expiry, usage limits)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Bootstrap 5 | Base styling |
| CSS Modules | Component-scoped styles |
| React Icons | Icon library |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Multer | File uploads |
| dotenv | Environment config |

---

## 📁 Project Structure

```
ecommerce-fullstack-design/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── assets/             # Images and static files
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── MobileNavbar.jsx
│   │   │   ├── MobileSidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductListing.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Products.jsx
│   │   │       ├── Categories.jsx
│   │   │       ├── OrdersAdmin.jsx
│   │   │       ├── Users.jsx
│   │   │       └── Coupons.jsx
│   │   ├── api/                # Axios instance & interceptors
│   │   ├── App.jsx             # Routes
│   │   └── main.jsx
│   └── package.json
│
└── server/                     # Express backend
    ├── config/
    │   └── db.js               # MongoDB connection
    ├── controllers/            # Route handlers
    │   ├── authController.js
    │   ├── productController.js
    │   ├── orderController.js
    │   ├── cartController.js
    │   ├── couponController.js
    │   ├── categoryController.js
    │   └── adminController.js
    ├── middleware/
    │   └── authMiddleware.js   # JWT protect + adminOnly
    ├── models/                 # Mongoose schemas
    │   ├── User.js
    │   ├── Product.js
    │   ├── Order.js
    │   ├── Cart.js
    │   ├── Category.js
    │   └── Coupon.js
    ├── routes/                 # Express routers
    ├── server.js               # Entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Muhammad-Shoaib-1/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
JWT_SECRET=your_strong_secret_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
```

### 3. Setup the frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```


## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get my orders |
| GET | `/api/orders/:id` | Get order detail |
| PUT | `/api/orders/:id/cancel` | Cancel order |
| GET | `/api/orders/admin/all` | All orders (admin) |
| PUT | `/api/orders/:id/status` | Update status (admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:itemId` | Update quantity |
| DELETE | `/api/cart/:itemId` | Remove item |
| PUT | `/api/cart/:itemId/save` | Save for later |

### Coupons
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/coupons/apply` | Apply coupon |
| POST | `/api/coupons` | Create coupon (admin) |

---

## 🔒 Security
- Passwords hashed with bcryptjs (salt rounds: 12)
- JWT tokens with expiry
- Protected routes with middleware guards
- Admin-only routes with role check
- Server validates coupon and stock before order placement
- CORS restricted to frontend origin via environment variable

---

## 👤 Author

**Muhammad Shoaib**
- GitHub: [@Muhammad-Shoaib-1](https://github.com/Muhammad-Shoaib-1)
- LinkedIn: [Muhammad Shoaib](https://www.linkedin.com/in/muhammad-shoaib-3334982aa/)
---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
