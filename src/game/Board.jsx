import React, { useState } from "react";

const Board = () => {
  const [player, setPlayer] = useState(0);

  return (
    <>
      <section>{`Player ${player}, it's your turn!`}</section>
      <section id="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div key={row}>
              {Array(3)
                .fill(null)
                .map((_, column) => {
                  return (
                    <button
                      className="border"
                      key={row + "_" + column}
                    ></button>
                  );
                })}
            </div>
          ))}
      </section>
    </>
  );
};

export default Board;
