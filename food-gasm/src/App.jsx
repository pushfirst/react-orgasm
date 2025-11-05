import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import HeaderComponent from "./components/Header";
import BodyComponent from "./components/Body";
import AboutComponent from "./components/AboutComponent";
import ContactUSComponent from "./components/ContactUS";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
/**
 * Header
 * - Logo
 * - Nav Bar (Home, About, Contact, Cart)
 * Body
 * - Search bar
 * - Restaurant Container
 *   - Restaurant Card (many cards)
 *     - Image
 *     - Name
 *     - Cuisines
 *     - Ratings
 * Footer
 * - Copyright Info
 * - Address
 * - Contact Info
 * - Links
 */

const AppLayoutComponent = () => {
  return (
    <div className="app">
      <HeaderComponent />
      <Outlet/>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayoutComponent />,
    children: [
      {
        path:'/',
        element: <BodyComponent/>
      },
      {
        path: "/about",
        element: <AboutComponent />,
      },
      {
        path: "/contact",
        element: <ContactUSComponent />,
      },
      {
        path: '/restaurant/:restaurantId',
        element: <RestaurantMenu/>
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
