import React, { useEffect, useState } from "react";
import MenuItemList from "./MenuItemList";

const RestaurantCategory = ({ data, isOpen, setShowIndex }) => {
  
  const handleClick = () => {
    setShowIndex();
  };
  const {category, dishes} = data;
  console.log("cat", category);

  return (
    <div className="accordion-item" >
      <button className="accordion-trigger" aria-expanded={isOpen} onClick={setShowIndex}>
        <span className="ml-2 text-xs bg-slate-100 text-slate-600 px-2 py-[2px] rounded-full">
          {Array.isArray(dishes)
            ? `${category}-${dishes.length}`
            : 0}
        </span>
        <span className="accordion-chevron">🔽</span>
      </button>
      <div className={`accordion-content ${isOpen ? "is-open" : ""}`}>
        {isOpen && <MenuItemList dishes={dishes}/>}
        {/* {renderDishes(category.dishes)} */}
      </div>
    </div>
  );
};

export default RestaurantCategory;
