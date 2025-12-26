import { Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/signin";
import ForgotPassword from "./pages/ForgotPassword";
export const serverUrl = "http://localhost:8000";
const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default App;
