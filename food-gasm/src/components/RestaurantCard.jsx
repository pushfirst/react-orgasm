import React from "react";
import { IMAGE_CDN_URL } from "../utilities/constants";


const RestaurantCardComponent = ({ data }) => {
  if (!data) return null;
  const {
    name,
    cuisines,
    locality,
    areaName,
    avgRating,
    sla,
    cloudinaryImageId,
    costForTwoMessage,
    aggregatedDiscountInfoV3,
  } = data;
  const itemmDiscountInfo = `${aggregatedDiscountInfoV3?.header+aggregatedDiscountInfoV3?.subHeader}` || '';
  return (
    <article className="restaurant-card">
      <div className="media">
        <img
          className="restaurant-logo"
          src={IMAGE_CDN_URL + cloudinaryImageId}
          alt="McDonald's"
        />
        <div className="ribbon">
          {itemmDiscountInfo}
        </div>
      </div>
      <div className="restaurant-info">
        <h3>{name}</h3>
        <div className="meta-row">
          <span className="cost-for-two">{costForTwoMessage}</span>
          <span className="rating-pill">{avgRating}</span>
          <span className="dot"></span>
          <span className="meta-time">{sla.slaString}</span>
        </div>
        {cuisines.map((cuisine) => {
          return (
            <span key={cuisine} className="cuisines">
              {`${cuisine}💠`}
            </span>
          );
        })}

        <p className="locality">{locality}</p>
        <span className="dot"></span>
        <p className="locality">{areaName}</p>
      </div>
    </article>
  );
};

// Higher Order Component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="promoted-card">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
    )
  }
}

export default RestaurantCardComponent;