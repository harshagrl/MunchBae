import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopsInMyCity } from "../store/user.slice";

const useGetShopByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchShops = async () => {
      if (!currentCity) return;
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-shop-by-city/${currentCity}`,
          {
            withCredentials: true,
          },
        );
        dispatch(setShopsInMyCity(result.data || []));
      } catch (error) {
        dispatch(setShopsInMyCity([]));
      }
    };
    fetchShops();
  }, [currentCity, dispatch]);
};

export default useGetShopByCity;
