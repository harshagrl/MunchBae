import { createSlice } from "@reduxjs/toolkit";

const getInitialCartItems = () => {
  try {
    const items = localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Failed to parse cart items from localStorage", error);
    return [];
  }
};

const getInitialUserData = () => {
  try {
    const user = localStorage.getItem("userData");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error);
    return null;
  }
};

const initialCartItems = getInitialCartItems();
const initialTotalAmount = initialCartItems.reduce(
  (sum, i) => sum + i.price * i.quantity,
  0
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: getInitialUserData(),
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopsInMyCity: [],
    itemsInMyCity: [],
    cartItems: initialCartItems,
    totalAmount: initialTotalAmount,
    myOrders: [],
    searchItems: [],
    socket: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id == cartItem.id);
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id == id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },
    updateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((o) => o._id === orderId);

      if (order) {
        if (order.shopOrders && order.shopOrders.shop._id === shopId) {
          order.shopOrders.status = status;
        }
      }
    },
    updateRealTimeOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((o) => o._id === orderId);

      if (order) {
        const shopOrder = order.shopOrders.find((s) => s.shop._id === shopId);
        if (shopOrder) {
          shopOrder.status = status;
        }
      }
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeItem,
  setMyOrders,
  addMyOrder,
  updateOrderStatus,
  setSearchItems,
  setSocket,
  updateRealTimeOrderStatus,
  clearCart,
} = userSlice.actions;
export default userSlice.reducer;
