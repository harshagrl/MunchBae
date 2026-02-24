import { Navigate, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddFoodItem from "./pages/AddFoodItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemByCity from "./hooks/useGetItemsByCity";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import { useEffect } from "react";
import { addMyOrder, setSocket, setUserData, updateRealTimeOrderStatus } from "./store/user.slice";
import useUpdateUserLocation from "./hooks/useUpdateUserLocation";
import TrackOrderPage from "./pages/TrackOrderPage";
import Shop from "./pages/Shop";
import FAQs from "./pages/FAQs";
import PartnerWithUs from "./pages/PartnerWithUs";
import Blog from "./pages/Blog";
import TermsPrivacy from "./pages/TermsPrivacy";
import EditProfile from "./pages/EditProfile";
import { io } from "socket.io-client";
import { Toaster } from "react-hot-toast";
import axios from "axios";

export const serverUrl = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use((config) => {
  try {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      // Only attach the token to requests intended for our own backend
      if (userData?.token && config.url.startsWith(serverUrl)) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
  } catch (error) {
    console.error("Axios interceptor error", error);
  }
  return config;
});

const App = () => {
  const dispatch = useDispatch();
  const { userData, socket } = useSelector((state) => state.user);



  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemByCity();
  useGetMyOrders();
  useUpdateUserLocation();
  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true });
    dispatch(setSocket(socketInstance));
    socketInstance.on("connect", () => {
      if (userData) {
        socketInstance.emit("identity", { userId: userData._id });
      }
    });

    socketInstance.on("newOrder", (data) => {
      if (userData?.role === "owner") {
        if (data.shopOrders?.owner?._id === userData._id || data.shopOrders?.owner === userData._id) {
          dispatch(addMyOrder(data));
        }
      }
    });

    socketInstance.on("update-status", ({ orderId, shopId, status, userId }) => {
      // In the Owner's my order page, their userId is not the same as the user who placed the order. 
      // The backend emits to both the user and the shop owner directly now.
      dispatch(updateRealTimeOrderStatus({ orderId, shopId, status }));
    });
    
    socketInstance.on("update-assignment", ({ orderId, shopId, assignedDeliveryPartner }) => {
       dispatch(updateRealTimeOrderStatus({ orderId, shopId, assignedDeliveryPartner }));
    });

    return () => {
      socketInstance.off("newOrder");
      socketInstance.off("update-status");
      socketInstance.off("update-assignment");
      socketInstance.disconnect();
    };
  }, [userData?._id]);

  useEffect(() => {
    if (userData && socket) {
      socket.emit("identity", { userId: userData._id });
    }
  }, [userData, socket]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={userData ? <Navigate to={"/home"} /> : <LandingPage />}
        />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/add-item"
          element={userData ? <AddFoodItem /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/edit-item/:itemId"
          element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/cart"
          element={userData ? <Cart /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/checkout"
          element={userData ? <Checkout /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/order-placed"
          element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/my-orders"
          element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/track-order/:orderId"
          element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/shop/:shopId"
          element={userData ? <Shop /> : <Navigate to={"/signin"} />}
        />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms-privacy" element={<TermsPrivacy />} />
        <Route
          path="/edit-profile"
          element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </>
  );
};

export default App;
