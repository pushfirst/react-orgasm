import React, { useContext, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "/assets/images/logo.avif";
import useNetworkStatus from "../utilities/useNetworkStatus";
import UserContext from "../utilities/userContext";

const HeaderComponent = () => {
  // let buttonName = "Login";
  const [buttonName, setButtonName] = useState("Login");
  const onlineStatus = useNetworkStatus();

  const { loggedInUser } = useContext(UserContext);
  const cart = useSelector((store) => store.cart.items);
  // console.log('Cart-Items', cart);
  return (
    <div className="flex justify-between shadow-lg items-center">
      <div className="image-container">
        <img className="w-30" src={logo} alt="logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex">
          <li>{onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home🏠</Link>
          </li>
          <li>
            <Link to="/about">About🪧</Link>
          </li>
          <li>
            <Link to="/contact">Contact US🤙</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery🤙</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart"> Cart </Link>({cart.length})🛒
            </li>
          <button
            className="login-button"
            onClick={() => {
              buttonName === "Login"
                ? setButtonName("Logout")
                : setButtonName("Login");
            }}
          >
            {buttonName}
          </button>
          <p className="px-2 font-bold">{loggedInUser.name}</p>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComponent;
