import "./App.css";
import GameBoard from "src/components/GameBoard";
import React from "react";
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Connect Four"),
        React.createElement(GameBoard, null)));
};
export default App;
