import React, { useState } from "react";
import { c4Columns, c4Rows } from "src/components/constants/index";
import GameRow from "src/components/GameRow";
const GameBoard = () => {
    const initialBoard = {
        rows: Array.from({ length: c4Rows }, (_, i) => ({
            columns: Array.from({ length: c4Columns }, (_, i) => ({
                player: null,
            })),
        })),
    };
    const [board, setBoard] = useState(initialBoard);
    const [currPlayer, setCurrPlayer] = useState(1);
    const updateBoard = (columnIndex) => {
        let boardCopy = board;
        let rowIndex = 0;
        let areColumnsFull = true;
        for (let r = 5; r >= 0; r--) {
            let columnPlayer = boardCopy.rows[r].columns[columnIndex].player;
            if (!columnPlayer) {
                boardCopy.rows[r].columns[columnIndex].player = currPlayer;
                rowIndex = r;
                areColumnsFull = false;
                break;
            }
        }
        if (!areColumnsFull) {
            setBoard(boardCopy);
            setCurrPlayer(currPlayer === 1 ? 2 : 1);
        }
        if (winCheck(rowIndex, columnIndex)) {
            setBoard(initialBoard);
            alert("player " + currPlayer + " wins");
            setCurrPlayer(1);
        }
        else {
            if (drawCheck()) {
                setBoard(initialBoard);
                alert("Draw");
                setCurrPlayer(1);
            }
        }
    };
    const drawCheck = () => {
        let isBoardFilled = board.rows.filter((row) => row.columns.filter((column) => column.player === null).length > 0).length > 0
            ? false
            : true;
        return isBoardFilled;
    };
    const winCheck = (rowIndex, columnIndex) => {
        return (checkHorizontal(rowIndex, columnIndex) ||
            checkVertical(rowIndex, columnIndex) ||
            checkDiagonal(rowIndex, columnIndex));
    };
    // Horizantal works
    const checkHorizontal = (rowIndex, columnIndex) => {
        let row = board.rows[rowIndex];
        let consecutiveRows = 0;
        for (let h = 0; h < c4Columns; h++) {
            if (row.columns[h].player === currPlayer) {
                consecutiveRows++;
                if (consecutiveRows === 4) {
                    return true;
                }
            }
            else {
                consecutiveRows = 0;
            }
        }
        // console.log(
        //     `currentColumnIndex: ${columnIndex}, consecutiveColumns: ${consecutiveColumns}`
        // );
        return false;
    };
    // Vertical works
    const checkVertical = (rowIndex, columnIndex) => {
        let row = board.rows[rowIndex];
        let consecutiveRows = 0;
        for (let r = 0; r < c4Rows; r++) {
            if (board.rows[r].columns[columnIndex].player ===
                row.columns[columnIndex].player) {
                consecutiveRows++;
                if (consecutiveRows >= 4) {
                    return true;
                }
            }
            else {
                consecutiveRows = 0;
            }
        }
        return false;
    };
    // Diagonal works
    const checkDiagonal = (rowIndex, columnIndex) => {
        var _a, _b, _c;
        let consecutiveTiles = 0;
        // Check diagonal left
        let columnToStartFrom = columnIndex;
        let rowToStartFrom = rowIndex;
        for (let i = 0; i < c4Rows; i++) {
            let column = (_a = board.rows[rowIndex - i]) === null || _a === void 0 ? void 0 : _a.columns[columnIndex + i];
            if (column) {
                columnToStartFrom = columnIndex + i;
                rowToStartFrom = rowIndex - i;
            }
            else {
                break;
            }
        }
        for (let j = 0; j < c4Rows; j++) {
            let column = (_b = board.rows[rowToStartFrom + j]) === null || _b === void 0 ? void 0 : _b.columns[columnToStartFrom - j];
            if (column) {
                if (column.player === currPlayer) {
                    consecutiveTiles++;
                    if (consecutiveTiles >= 4) {
                        return true;
                    }
                }
                else {
                    consecutiveTiles = 0;
                }
            }
        }
        // Check diagonal right
        let indexDifference = rowIndex - columnIndex;
        rowToStartFrom = 0;
        columnToStartFrom = 0;
        if (indexDifference > 0) {
            rowToStartFrom = indexDifference;
        }
        else if (indexDifference !== 0) {
            columnToStartFrom = Math.abs(indexDifference);
        }
        for (let i = 0; i < c4Rows; i++) {
            let column = (_c = board.rows[rowToStartFrom + i]) === null || _c === void 0 ? void 0 : _c.columns[columnToStartFrom + i];
            if (column) {
                if (column.player === currPlayer) {
                    consecutiveTiles++;
                    if (consecutiveTiles >= 4) {
                        return true;
                    }
                }
                else {
                    consecutiveTiles = 0;
                }
            }
        }
        return false;
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "button", onClick: () => {
                setBoard(initialBoard);
            } }, "New Game"),
        React.createElement("table", null,
            React.createElement("thead", null),
            React.createElement("tbody", null, board.rows.map((row, i) => (React.createElement(GameRow, { key: i, row: row, updateBoard: updateBoard })))))));
};
export default GameBoard;
