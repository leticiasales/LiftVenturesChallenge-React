import React from "react";
import Board from "./game/Board";

const App = () => (
  <main id="app" className="bg-gray-100 h-screen flex flex-col">
    <header className="w-full bg-white text-center py-2 border-orange-100 border-b-4">
      <h1 className="text-orange-300 text-xl font-bold">TicTacToe</h1>
    </header>
    <Board />
  </main>
);

export default App;
