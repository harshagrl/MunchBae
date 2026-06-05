import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../store/user.slice";
import { setAddress, setLocation } from "../store/map.slice";

const useGetCity = () => {
  const { userData } = useSelector((state) => state.user);
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;
  const dispatch = useDispatch();
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      // User has manually selected a city — skip geolocation
      dispatch(setCurrentCity(savedCity));
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude }));
      const fetchLocation = async () => {
        try {
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`,
          );
          const loc = result?.data?.results[0];
          const cityName =
            loc?.state_district ||
            loc?.city ||
            loc?.county ||
            loc?.state ||
            "Kapurthala";
          dispatch(setCurrentCity(cityName));
          dispatch(setCurrentState(loc?.state));
          dispatch(
            setCurrentAddress(
              loc?.formatted || loc?.address_line2,
            ),
          );
          dispatch(
            setAddress(
              loc?.formatted || loc?.address_line2,
            ),
          );
        } catch (error) {
          dispatch(setCurrentCity("Kapurthala"));
        }
      };

      fetchLocation();
    });
  }, [userData, dispatch, geoApiKey]);
};

export default useGetCity;
