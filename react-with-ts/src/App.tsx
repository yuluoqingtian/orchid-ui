import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";

const App: React.FC = () => {
  return (
    <div className="App">
        <Hello />
        <LikeButton/>
        <MouseTracker/>
    </div>
  );
}

export default App;
