import React from "react";
import Tile from "src/components/Tile";
const GameRow = ({ row, updateBoard, }) => {
    return (React.createElement("tr", null, row.columns.map((column, i) => (React.createElement(Tile, { key: i, column: column, columnIndex: i, updateBoard: updateBoard })))));
};
export default GameRow;
