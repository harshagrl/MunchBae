import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useUpdateUserLocation = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const updateUserLocation = async (lat, long) => {
      try {
        const result = await axios.post(
          `/api/user/update-location`,
          {
            lat,
            long,
          },
          { withCredentials: true },
        );
        console.log("User location updated:", result.data);
      } catch (error) {
        console.error("Error updating user location:", error);
      }
    };
    navigator.geolocation.watchPosition((pos) => {
      updateUserLocation(pos.coords.latitude, pos.coords.longitude);
    });
  }, [userData, dispatch]);
};

export default useUpdateUserLocation;
