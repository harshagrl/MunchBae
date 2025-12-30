import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashBoard from "../components/OwnerDashBoard";
import DeliveryBoyDashBoard from "../components/DeliveryBoyDashBoard";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div>
      {userData.role == "user" && <UserDashboard />}
      {userData.role == "owner" && <OwnerDashBoard />}
      {userData.role == "deliveryBoy" && <DeliveryBoyDashBoard />}
    </div>
  );
};

export default Home;
