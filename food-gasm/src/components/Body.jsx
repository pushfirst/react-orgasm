import React, { useEffect, useState } from "react";

import RestaurantCardComponent from "./RestaurantCard";
import { fetchRestaurants } from "../api/swiggy-live-api-call";
import ShimmerCard from "./ShimmerCard";
import { Link } from "react-router-dom";

const BodyComponent = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchRestaurants();
        setlistOfRestaurants(res);
        setFilteredListOfRestaurants(res);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        console.log("done!");
      }
    })();
  }, []);

  // Conditional Rendering
  return listOfRestaurants.length === 0 ? (
    <ShimmerCard />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            value={searchText}
            onChange={(elem) => {
              if (elem.target.value.length === 0) {
                setFilteredListOfRestaurants(listOfRestaurants);
              }
              setSearchText(elem.target.value);
            }}
          />
          <button
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter(
                (restaurant) =>
                  restaurant.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              );
              setFilteredListOfRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        {/* <button className="login-button" onClick={() => {
            const filteredList = listOfRestaurants.filter(restaurant => parseFloat(restaurant.info.avgRating) > 4.40);
            setlistOfRestaurants(filteredList);
        }}>Top Rated Restaurant</button> */}
      </div>
      <div className="restaurants-container">
        {filteredListOfRestaurants.map((data) => {
          return (
            <Link key={data.info.id} to={"restaurant/"+data.info.id}><RestaurantCardComponent key={data.info.id} data={data.info} /></Link>
          );
        })}
      </div>
    </div>
  );
};

export default BodyComponent;
