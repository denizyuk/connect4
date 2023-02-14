import React, { useState } from "react";
import { c4Columns, c4Rows } from "src/components/constants/index";
import GameRow from "src/components/GameRow";
import { Board } from "src/components/interfaces/Board";
import { Row } from "src/components/interfaces/Row";
import { Column } from "src/components/interfaces/Column";

const GameBoard: React.FunctionComponent = (): JSX.Element => {
    const initialBoard: Board = {
        rows: Array.from({ length: c4Rows }, (_, i) => ({
            columns: Array.from({ length: c4Columns }, (_, i) => ({
                player: null,
            })),
        })),
    };
    const [board, setBoard] = useState<Board>(initialBoard);
    const [currPlayer, setCurrPlayer] = useState<number>(1);

    const updateBoard = (columnIndex: number): void => {
        let boardCopy: Board = board;
        let rowIndex: number = 0;
        let areColumnsFull = true;
        for (let r: number = 5; r >= 0; r--) {
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
        } else {
            if (drawCheck()) {
                setBoard(initialBoard);
                alert("Draw");
                setCurrPlayer(1);
            }
        }
    };
    const drawCheck = (): boolean => {
        let isBoardFilled: boolean =
            board.rows.filter(
                (row: Row) =>
                    row.columns.filter(
                        (column: Column) => column.player === null
                    ).length > 0
            ).length > 0
                ? false
                : true;
        return isBoardFilled;
    };
    const winCheck = (rowIndex: number, columnIndex: number): boolean => {
        return (
            checkHorizontal(rowIndex, columnIndex) ||
            checkVertical(rowIndex, columnIndex) ||
            checkDiagonalRight(rowIndex, columnIndex) ||
            checkDiagonalLeft(rowIndex, columnIndex)
        );
    };
};

export default GameBoard;
