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
      // User has manually selected a city — skip geolocation but fetch its coordinates
      dispatch(setCurrentCity(savedCity));
      
      const fetchCityCoords = async () => {
        try {
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(savedCity)}&apiKey=${geoApiKey}`
          );
          if (result.data.features && result.data.features.length > 0) {
            const { lat, lon, formatted, state } = result.data.features[0].properties;
            dispatch(setLocation({ lat, long: lon }));
            dispatch(setAddress(formatted || savedCity));
            dispatch(setCurrentState(state));
            dispatch(setCurrentAddress(formatted || savedCity));
          }
        } catch (error) {
          console.error("Failed to get city coordinates", error);
        }
      };
      fetchCityCoords();
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
