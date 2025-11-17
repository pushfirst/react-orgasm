import React, { useState, useMemo } from "react";

import findNthPrimeSieve from "../utilities/nth-prime";
const Demo = () => {
  const [text, setText] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const prime = useMemo(() => findNthPrimeSieve(Number(text)),[text]);
  console.log("Rendering", );
  return (
    <div className={"m-4 p-2 w-82 h-96 border border-black"+(isDarkTheme && "bg-gray-980 text-white")}>
        <div>
            <button className="m-10 p-2 bg-green-200" onClick={()=> setIsDarkTheme(!isDarkTheme)}>Toggle</button>
        </div>
      <div>
        <input
          className="w-72 border border-black p-2"
          type="number"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div>
        <h1 className="mt-4 font-bold text-xl"> N-th Prime: {prime}</h1>
      </div>
    </div>
  );
};

export default Demo;
