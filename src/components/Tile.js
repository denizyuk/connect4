import React from "react";
const Tile = ({ columnIndex, updateBoard, column, }) => {
    let tileStatus = "open";
    if (column.player === 1) {
        tileStatus = "player1";
    }
    else if (column.player === 2) {
        tileStatus = "player2";
    }
    return (React.createElement("td", null,
        React.createElement("div", { className: "tile", onClick: () => updateBoard(columnIndex) },
            React.createElement("div", { className: [tileStatus, "circle"].join(" ") }))));
};
export default Tile;
