import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../store/user.slice";

const useGetItemsByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchItems = async () => {
      if (!currentCity) return; // Skip if no city selected
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-item-by-city/${currentCity}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setItemsInMyCity(result.data || []));
      } catch (error) {
        // Silent fail - items might not exist yet
        dispatch(setItemsInMyCity([]));
      }
    };
    fetchItems();
  }, [currentCity, dispatch]);
};

export default useGetItemsByCity;
