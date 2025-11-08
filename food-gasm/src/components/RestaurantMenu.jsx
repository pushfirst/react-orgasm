import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import useRestaurantMenu from "../utilities/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import ShimmerCard from "./ShimmerCard";
import UserContext from "../utilities/userContext";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { restaurantId } = useParams();
  const {loggedInUser} = useContext(UserContext);
  console.log('loggedInUser',loggedInUser);

  const restaurantInfo = useRestaurantMenu(restaurantId);

  if (restaurantInfo === null) return <ShimmerCard />;

  const { name, cuisines, costForTwoMessage } = restaurantInfo?.info || {};
  const categories = Array.isArray(restaurantInfo?.categories)
    ? restaurantInfo.categories
    : [];
  return (
    <div className="menu">
      <h1> Hello: {loggedInUser.name}</h1>
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ") || ""} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <div className="accordion">
        {categories.map((category, index) => (
          <RestaurantCategory key={`${category.category}-${categories[index].dishes.length}`} data={category} isOpen={index === showIndex} setShowIndex={()=> setShowIndex(prev => (prev === index ? null : index))} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
