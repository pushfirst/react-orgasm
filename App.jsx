import React from "react";
import ReactDOM from "react-dom/client";

const number = 1;

// component composition
const HeadingComponent = () => {
  return (
    <div id="container">
      <h1 className="head" tabIndex="1">
        I am h1 heading functional component
      </h1>
    </div>
  );
};
const TitleElement = (
  <h1 className="tile" tabIndex="1">
    I am a title functional component {number}
    <HeadingComponent />
  </h1>
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(TitleElement);
