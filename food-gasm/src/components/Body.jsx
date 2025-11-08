import React, { useContext, useEffect, useState } from "react";

import RestaurantCardComponent, {withPromotedLabel} from "./RestaurantCard";
import { fetchRestaurants } from "../api/swiggy-live-api-call";
import ShimmerCard from "./ShimmerCard";
import { Link } from "react-router-dom";
import useNetworkStatus from "../utilities/useNetworkStatus";
import UserContext from "../utilities/userContext";


const BodyComponent = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );
  const [searchText, setSearchText] = useState("");

  const {loggedInUser, setUsername } = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCardComponent);

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

  if(!useNetworkStatus()) return (<h1>'Looks like you are Offline!! Please check your internet connection.'</h1>)
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
                  <input
            type="text"
            className="search-bar"
            value={loggedInUser.name}
            onChange={(elem)=>setUsername({
              name: elem.target.value
            })}
          />
      </div>
      <div className="restaurants-container">
        {filteredListOfRestaurants.map((data) => {
          return (
            <Link 
              key={data.info.id} 
              to={"restaurant/"+data.info.id}
              >
              {
                (data?.info?.promoted) 
                  ? <RestaurantCardPromoted key={data.info.id} data={data.info} /> 
                  : <RestaurantCardComponent key={data.info.id} data={data.info} />
              }
              </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BodyComponent;
