import React, { useEffect, useState } from "react";
import ShimmerCard from "./ShimmerCard";
import extractMenuItems from "../utilities/fetchMenuItems";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const { restaurantId } = useParams();
  useEffect(() => {
    getRestaurantMenu(restaurantId);
  }, []);

  async function getRestaurantMenu(restaurantId) {
    try {
      const res = await fetch(
        "http://localhost:3002/menu?lat=26.83730&lng=80.91650&restaurantId="+{restaurantId}
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setRestaurantInfo(extractMenuItems(json.data));
      
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  if (restaurantInfo === null) return <ShimmerCard />;

  const { name, cuisines, costForTwoMessage } =
    restaurantInfo?.info || {};
  const { dishes } =
    restaurantInfo?.categories[0] || {};
  console.log(dishes);
  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")||''} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.name} - {dish.defaultPrice || dish.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
