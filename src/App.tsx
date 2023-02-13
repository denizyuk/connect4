import React from "react";
import "./App.css";
import Gameboard from "src/components/GameBoard";

function App() {
    return (
        <div className="App">
            <h1>Connect 4</h1>
            <Gameboard />
        </div>
    );
}

export default App;
