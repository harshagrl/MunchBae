import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice.js";
import ownerSlice from "./owner.slice.js";
import mapSlice from "./map.slice.js";
const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
    map: mapSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
