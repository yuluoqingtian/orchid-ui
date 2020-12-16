import React, { useState, useEffect } from "react";

const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("add effect");
    const updateMousePosition = (event: MouseEvent) => {
      setPositions({ x: event.pageX, y: event.pageY });
    };
    document.addEventListener("mousemove", updateMousePosition);

    return function clean() {
      console.log("clean effect");
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return positions;
};

export default useMousePosition;
