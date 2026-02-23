# 🍔 MunchBae - The Complete Development Journey

Welcome to the comprehensive development log for the **MunchBae** application. This document outlines the step-by-step creation of the platform, categorized by clear development phases for easy reading.

---

## 🏗️ Phase 1: Core Backend & Architecture Setup
- **Initialization**: Bootstrapped the project using `npm init` and installed core packages (`express`, `mongoose`, `cors`, `dotenv`).
- **Server Mechanics**: Established the main `index.js` file, configured `.env` for security, and added `nodemon` scripts for a smooth development process.
- **Structural Integrity**: Organized the codebase logically into `/routes`, `/models`, `/controllers`, and `/config` directories.
- **Database Connection**: Configured and established a stable MongoDB connection inside `config/db.js`.
- **Global Configuration**: Set up essential global middlewares including `cors`, `express.json`, and `cookie-parser`.

## 🔐 Phase 2: Security, Authentication & User Profiles
- **User Modeling**: Drafted the secure `User` schema (`models/user.model.js`).
- **Authorization**: Built a robust, JWT-based `token.js` utility for session control.
- **Auth Endpoints**: Developed detailed controllers and routers for **Signup**, **SignIn**, and **SignOut**.
- **Email Communications**: Integrated `nodemailer` for seamless OTP delivery to verify user identities.
- **Account Recovery**: Engineered the backend logic for `sendOtp`, `verifyOtp`, and `resetPassword` functionalities.
- **Google OAuth**: Integrated Firebase for seamless Google sign-in capabilities, complete with backend verifications.
- **Profile Management**: Developed intuitive **Edit Profile** pages and corresponding APIs across all user roles (Users, Owners, Delivery Boys).

## 💻 Phase 3: Frontend Foundation & State Management
- **Vite Setup**: Initialized a lightning-fast React application using **Vite**.
- **Styling Pipeline**: Installed and configured **TailwindCSS** and **DaisyUI** for a modern, utility-first design system.
- **Navigation Routing**: Implemented `react-router-dom` for application navigation, wrapping the app in a `BrowserRouter`.
- **Global State**: Architected Redux Toolkit (`store.js`, `user.slice.js`) to seamlessly manage user data across all pages.
- **Custom React Hooks**: Developed powerful hooks like `useGetCurrentUser` to automatically fetch and hydrate user state upon login.
- **UI Elements**: Configured a dynamic `NavBar` that adapts based on the user's login state and role.

## 🏪 Phase 4: The Owner Engine (Shops & Inventory)
- **Data Models**: Crafted the schemas for `Shop` and `Item` data points.
- **Media Uploads**: Configured local caching with `multer` and seamless cloud image storage via **Cloudinary**.
- **Shop Initialization**: Developed APIs to create, edit, and retrieve shop data, paired with the `useGetMyShop` frontend hook.
- **Menu Management**: Built deep functionality allowing owners to granularly manage their inventory (via `AddFoodItem` and `EditItem` pages).
- **Owner Dashboard**: Designed a comprehensive Owner interface featuring `OwnerItemCard`, complete with logical sorting by update time.

## 📍 Phase 5: Location, Discovery & Search
- **Geospatial Syncing**: Implemented `map.slice.js` and the `useGetCity` hook to capture and distribute the user's location globally.
- **Smart Queries**: Configured MongoDB location indexes to support rapid geospatial queries.
- **City-based Filtering**: Engineered advanced backend logic to filter both Shops and Items based on the user's active city (`useGetShopsByCity`, `useGetItemsByCity`).
- **User Dashboard**: Built a beautiful discovery interface utilizing categorized cards (`CategoryCard`, `CityShopsCard`, `FoodCard`).
- **Global Search**: Built a reactive search bar in the NavBar that rapidly queries items across the platform.

## 🛒 Phase 6: Cart Experience & Interactive Checkout
- **Cart Redux**: Implemented local cart logic (add, remove, quantity incrementation) and dynamic total price calculation.
- **Checkout Interface**: Built the `Cart.jsx` and `Checkout.jsx` workflow for seamless finalization.
- **Interactive Maps**: Engineered a `MapContainer` using **React-Leaflet**, featuring a `ReCenterMap` module.
- **Geocoding API**: Hooked into the Geoapify API to fluidly convert Map coordinates to Addresses, and Addresses to Map coordinates.
- **Payments Checkpoint**: Integrated the **Razorpay** payment gateway, complete with secure backend signature verification.

## 📦 Phase 7: Order Generation & Processing Pipeline
- **Transaction Models**: Engineered the `order.model.js` schema to handle multi-vendor checkout carts.
- **Order Retrieval APIs**: Developed role-specific fetching controllers (User vs. Owner).
- **Tracking Dashboards**: Created unified yet distinct views (`MyOrders.jsx`) rendering `UserOrderCard` and `OwnerOrderCard`.
- **Lifecycle Management**: Developed `updateOrderStatus` features allowing owners to natively push status changes to the database.

## 🚴 Phase 8: Delivery Partner Network & Logistics
- **Delivery Models**: Added `deliveryassignment.model.js` to manage the complex shop-to-rider handoff.
- **Real-Time GPS**: Engineered a `useUpdateUserLocation` system that pings rider coordinates periodically to the server.
- **Assignment Logic**: Hooked the backend to automatically generate delivery assignments upon an order's creation.
- **Rider Interface**: Built the `DeliveryBoyDashBoard` allowing riders to view active orders, accept them, and track their daily statistics.
- **Security Checkpoints**: Implemented a mandatory **OTP Handshake** (via email) to verify that the rider delivered the package securely.
- **Customer Tracking**: Created a `TrackOrderPage` allowing users to watch their driver via real-time Leaflet integration.

## ⚡ Phase 9: Real-time Communication & WebSockets 
- **Socket Initialization**: Implemented **Socket.io** on the Node.js layer and propagated it globally in React via `App.jsx`.
- **Live Notifications**: Successfully routed `newOrder` and `update-status` socket emissions.
- **Zero-Refresh UI**: The User "My Orders" and Owner Dashboards now react instantly to new data without requiring a browser reload.
- **Rider Radar**: Mapped live rider GPS coordinates via websockets directly to the user's tracking system.

## ✨ Phase 10: Aesthetics, Design Polish & Final Refinements
- **3D Brand Identity**: Re-engineered the hero and auth pages with an interactive **3D MunchBae Logo** featuring dynamic hover effects.
- **Theme Standardization**: Unified the design language across User, Owner, and Deliver dashboards utilizing premium glassmorphism.
- **Data Analytics**: Integrated **Recharts** to provide deep visual analytics and performance graphics.
- **System Stability**: Resolved critical React Router bugs preventing proper page persistence on refresh.
- **Global Codebase Optimization**: Purged unnecessary developer comments and optimized the NavBar for smaller responsive screens.

---
*End of Document. Maintained by the MunchBae Development Team.*