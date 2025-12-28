import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
const useGetCurrentUser = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
};

export default useGetCurrentUser;
