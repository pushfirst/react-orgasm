import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ShimmerCard from "./ShimmerCard";
import { IMAGE_CDN_URL } from "../utilities/constants";
import { addItem } from "../utilities/cartSlice";
const MenuItemList = ({dishes} ) => {

  const dispatch = useDispatch();
  const handleAddItem = (dish) => {
    // dispatch an action
    dispatch(addItem(dish));
  }
  console.log('dishes from cart',dishes);
  return (
    <div>
      <ul className="accordion-list">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-row">
            {/* Left: text block */}
            <div className="dish-left">
              <div className="dish-title-line">
                {/* veg/non-veg dot (optional) */}
                <span className="veg-dot" aria-hidden />
                <span className="dish-title">{dish.name}</span>
              </div>

              <div className="dish-price-line">
                {dish.mrp ? <span className="dish-mrp">₹{dish.mrp}</span> : null}
                <span className="dish-price">₹{((dish.defaultPrice)/100).toFixed(2)}</span>
                {dish.isBestPrice ? <span className="best-price-pill">BEST PRICE</span> : null}
              </div>

              {/* rating (optional) */}
              {dish.rating ? (
                <div className="dish-rating">
                  <span className="star">★</span>
                  <span className="score">{dish.rating}</span>
                  {dish.ratingCount ? <span className="count">({dish.ratingCount})</span> : null}
                </div>
              ) : null}

              <p className="dish-desc">{dish.description}</p>
            </div>

            {/* Right: image + Add button (optional) */}
            {(dish.imageUrl || dish.imageId) && (
              <div className="dish-right">
                <img
                  className="dish-thumb"
                  src={IMAGE_CDN_URL + dish.imageId}
                  alt={dish.name}
                  loading="lazy"
                />
                <button className="dish-add" onClick={()=>handleAddItem(dish)}>ADD +</button>
                <div className="dish-custom">Customisable</div>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};


export default MenuItemList;
