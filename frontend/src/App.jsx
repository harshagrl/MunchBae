import { Navigate, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/signin";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
export const serverUrl = "http://localhost:8000";
const App = () => {
  useGetCurrentUser();
  useGetCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default App;
