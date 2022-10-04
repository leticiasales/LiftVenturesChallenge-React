import React, { useEffect, useState } from "react";
import Result from "./Result";

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const template = Array(3).fill(0);
  const [board, setBoard] = useState(Array(3).fill(template));

  // called everytime the board changes
  useEffect(() => {
    if (checkRows(board) || checkColumns() || checkDiagonals())
      setWinner(currentPlayer);
    else if (checkTie()) setWinner(0);
    else setCurrentPlayer(-currentPlayer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  // works as a ComponentDidMount
  useEffect(() => {
    setCurrentPlayer(1);
  }, []);

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

  const checkDiagonals = () => {
    const len = board.length;
    let d1 = true,
      d2 = true;
    for (let i = 0; i < len; i++) {
      d1 = d1 && board[0][0] === board[i][i];
      d2 = d2 && board[0][len - 1] === board[i][len - 1 - i];
    }
    return (d1 && board[0][0]) || (d2 && board[0][len - 1]);
  };

  const checkTie = () => {
    return !board.some((row) => row.some((item) => item === 0));
  };

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
    setCurrentPlayer(-1);
  };

  return (
    <>
      {winner === null ? (
        <>
          <section
            id="board"
            className="flex items-center justify-center flex-col h-full"
          >
            <div className="text-center my-4">{`Player ${playerName(
              currentPlayer
            )}, it's your turn!`}</div>
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
