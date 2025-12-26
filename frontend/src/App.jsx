import React from "react";
import { Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
export const serverUrl = "http://localhost:8000";
const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default App;
