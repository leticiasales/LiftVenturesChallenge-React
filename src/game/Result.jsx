import React from "react";

const Result = (props) => {
  const winnerName = () => {
    if (props.winner) {
      const winner = props.winner === 1 ? "X" : "O";
      return `Player ${winner} wins!`;
    } else return "It's a tie :(";
  };

  return (
    <section
      id="result"
      className="w-full flex-grow flex flex-col justify-center items-center"
    >
      <div className="mb-4">
        <b className="text-lg">{winnerName()}</b>
      </div>
      <div>
        <button
          onClick={() => props.reset()}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Play again!
        </button>
      </div>
    </section>
  );
};

export default Result;
