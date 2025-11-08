import React, {useState, useEffect} from "react";
import extractMenuItems from "../utilities/fetchMenuItems";


const useRestaurantMenu = (restaurantId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  useEffect(() => {
    getRestaurantMenu(restaurantId);
  }, []);

  async function getRestaurantMenu(restaurantId) {
    try {
      console.log(restaurantId);
      const res = await fetch(
        `http://localhost:3002/menu?lat=26.83730&lng=80.91650&restaurantId=${restaurantId}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setRestaurantInfo(extractMenuItems(json.data));
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  return restaurantInfo;
};

export default useRestaurantMenu;
