import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../store/user.slice";

const useGetCity = () => {
  const { userData } = useSelector((state) => state.user);
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`
      );
      dispatch(setCurrentCity(result?.data?.results[0].state_district));
      dispatch(setCurrentState(result?.data?.results[0].state));
      dispatch(
        setCurrentAddress(
          result?.data?.results[0].formatted ||
            result?.data?.results[0].address_line2
        )
      );
    });
  }, [userData]);
};

export default useGetCity;
