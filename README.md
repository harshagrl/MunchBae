# 🍔 MunchBae - Food Delivery Application

MunchBae is a comprehensive, full-stack MERN application that connects food lovers with their favorite local restaurants. It features a seamless ordering experience for users, a robust management platform for restaurant owners, and a dedicated interface for delivery partners.

---

## 🚀 Features

### **👤 User Features**
- **Smart Discovery**: Search for food and restaurants with city-based geospatial filtering.
- **Interactive Ordering**: Real-time cart management and map-integrated checkout.
- **Live Order Tracking**: Watch your delivery partner move in real-time on a Leaflet map via Socket.io.
- **Secure Payments**: Fully integrated with Razorpay, including backend verification.
- **Enhanced Security**: OTP-based password resets and secure account verification via Nodemailer.
- **Social Login**: Seamless Google OAuth integration via Firebase.

### **🏢 Restaurant Owner Side**
- **Powerful Dashboard**: Manage shop profiles, menus, and incoming orders in real-time.
- **Inventory Control**: Add, edit, and categorize food items with Cloudinary image hosting.
- **Visual Analytics**: Monitor restaurant performance and order trends with interactive Recharts.
- **Order Lifecycle**: Update order statuses that notify users instantly without page refreshes.

### **🚴 Delivery Partner Dashboard**
- **Logistics Hub**: Accept assignments, manage deliveries, and view daily earnings.
- **Rider Radar**: Live GPS coordinate broadcasting to keep users informed.
- **Handshake Verification**: Secure OTP-based delivery confirmation to ensure order accuracy.

---

## 🏗️ Architecture & Development Roadmap

MunchBae was built in structured phases to ensure scalability and security:

1.  **Core Foundation**: Express/Node.js backend with MongoDB/Mongoose architecture.
2.  **Auth & Security**: JWT-based session control and Google OAuth integration.
3.  **State Management**: Centralized logic using Redux Toolkit and custom React hooks.
4.  **Geospatial Engine**: MongoDB location indexing and Geoapify API for address/coordinate syncing.
5.  **Real-Time Layer**: Robust Socket.io implementation for notifications and live tracking.
6.  **Payment Gateway**: Secure Razorpay integration with backend signature verification.

> [!NOTE]
> For a detailed, step-by-step development log of every phase, please refer to [notes.md](file:///e:/MunchBae/notes.md).

---

## 🛠️ Technology Stack

| Part | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Redux Toolkit, Tailwind CSS, Framer Motion, Lucide Icons, Recharts, Leaflet |
| **Backend** | Node.js, Express, MongoDB (Mongoose), Socket.io |
| **Authentication** | JWT (JSON Web Tokens), Bcryptjs |
| **Media & Payments** | Cloudinary (Image Hosting), Razorpay (Payment Gateway) |

---

## ⚙️ Setup & Installation

### **Prerequisites**
- Node.js & npm installed
- MongoDB URI (Atlas or Local)
- Cloudinary & Razorpay API Credentials

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/munchbae.git
cd munchbae
```

### **2. Backend Setup**
Navigate to the `backend` folder and follow these steps:
- Install dependencies:
  ```bash
  cd backend
  npm install
  ```
- Create a `.env` file in the `backend` root and add:
  ```env
  PORT=8000
  MONGODB_URL=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  EMAIL=your_email
  PASS=your_email_app_password
  CLOUDINARY_CLOUDNAME=your_name
  CLOUDINARY_APIKEY=your_key
  CLOUDINARY_APISECRET=your_secret
  RAZORPAY_KEY_ID=your_razorpay_id
  RAZORPAY_KEY_SECRET=your_razorpay_secret
  FRONTEND_CLIENT_URL=http://localhost:5173
  ```
- Start the server:
  ```bash
  npm run dev
  ```

### **3. Frontend Setup**
Navigate to the `frontend` folder and follow these steps:
- Install dependencies:
  ```bash
  cd ../frontend
  npm install
  ```
- Create a `.env` file in the `frontend` root and add:
  ```env
  VITE_FIREBASE_APIKEY=your_firebase_key
  VITE_GEO_APIKEY=your_geo_api_key
  VITE_RAZORPAY_KEY_ID=your_razorpay_id
  VITE_BACKEND_URL=http://localhost:8000
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

---

## 📂 Project Structure

```text
MunchBae/
├── backend/          # Express server, MongoDB models, API routes, Socket.io
├── frontend/         # React SPA, Redux store, UI components, pages
└── README.md         # Project documentation
```

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

