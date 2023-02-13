import React, { useState } from "react";
import { c4Rows } from "src/components/constants";

const GameBoard: React.FC = (): JSX.Element => {
    const initialBoard = {
        rows: Array.from({ length: c4Rows }),
    };
    const [board, setBoard] = useState();
    return (
        <div>
            <button className="button">New Game</button>
        </div>
    );
};

export default GameBoard;
