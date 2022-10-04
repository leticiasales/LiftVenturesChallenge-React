import React, { useEffect, useState } from "react";
import Result from "./Result";

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const template = Array(3).fill(0);
  const [board, setBoard] = useState(Array(3).fill(template));

  useEffect(() => {
    const checkWin = () => {
      return checkRows(board) || checkColumns(board);
      //checkDiagonals
    };

    const checkRows = (rows) => {
      return rows.some((row) => row[0] && row.every((item) => item === row[0]));
    };

    const transpose = (matrix) => {
      let [row] = matrix;
      return row.map((value, column) => matrix.map((row) => row[column]));
    };

    const checkColumns = () => {
      const transposed = transpose(board);
      return checkRows(transposed);
    };

    const checkTie = () => {
      return !board.some((row) => row.some((item) => item === 0));
    };

    const changePlayer = () => {
      setCurrentPlayer(-currentPlayer);
    };

    if (checkWin()) setWinner(currentPlayer);
    else if (checkTie()) setWinner(0);
    else changePlayer();
  }, [board]);

  const clickButton = (row, col) => {
    if (board[row][col]) return;

    setBoard((prevBoard) => {
      const board = [...prevBoard];
      board[row] = [...board[row]];
      board[row][col] = currentPlayer;
      return board;
    });
  };

  const playerName = (player) => {
    return (player === 1 && "X") || (player === -1 && "O");
  };

  const resetBoard = () => {
    setBoard(Array(3).fill(template));
    setWinner(null);
    setCurrentPlayer(1);
  };

  return (
    <>
      {winner === null ? (
        <>
          <section>{`Player ${playerName(
            currentPlayer
          )}, it's your turn!`}</section>
          <section id="board" className="flex items-center justify-center">
            <div className="border border-black w-36 h-36">
              {board.map((cols, row) => (
                <div id={"row-" + row} key={row} className="flex h-1/3">
                  {cols.map((_, col) => {
                    return (
                      <button
                        className="border border-black w-1/3 text-xl"
                        key={row + "_" + col}
                        onClick={() => clickButton(row, col)}
                      >
                        {playerName(board[row][col])}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <Result winner={winner} reset={() => resetBoard()} />
      )}
    </>
  );
};

export default Board;
