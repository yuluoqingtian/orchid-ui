import React, { useState, useEffect } from "react";

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      console.log("我执行了");
      setPositions({ x: event.pageX, y: event.pageY });
    };

    document.addEventListener("click", updateMousePosition);

    return function clean() {
      document.removeEventListener("click", updateMousePosition);
    };
  });

  return (
    <p>
      x: {positions.x}， y: {positions.y}
    </p>
  );
};

export default MouseTracker;
