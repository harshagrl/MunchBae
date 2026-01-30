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
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude }));
      const fetchLocation = async () => {
        try {
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`,
          );
          // dispatch(setCurrentCity("Kapurthala"));
          dispatch(setCurrentCity(result?.data?.results[0].state_district));
          dispatch(setCurrentState(result?.data?.results[0].state));
          dispatch(
            setCurrentAddress(
              result?.data?.results[0].formatted ||
                result?.data?.results[0].address_line2,
            ),
          );
          dispatch(
            setAddress(
              result?.data?.results[0].formatted ||
                result?.data?.results[0].address_line2,
            ),
          );
        } catch (error) {}
      };

      fetchLocation();
    });
  }, [userData, dispatch, geoApiKey]);
};

export default useGetCity;
