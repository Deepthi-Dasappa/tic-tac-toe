import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { winningCombination } from "./winningCombination.js";
import GameOver, { gameOverScreen } from "./components/GameOver.jsx";

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });

  let activePlayer = derivedActivePlayer(gameTurns);

  let updatedGameBoard = [...gameBoard.map((innerArray) => [...innerArray])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    updatedGameBoard[row][column] = player;
  }

  let winner;

  for (const combination of winningCombination) {
    const firstWinningCombination =
      updatedGameBoard[combination[0].row][combination[0].column];
    const secondWinningCombinatiion =
      updatedGameBoard[combination[1].row][combination[1].column];
    const thirdWinningCombination =
      updatedGameBoard[combination[2].row][combination[2].column];

    if (
      firstWinningCombination &&
      firstWinningCombination === secondWinningCombinatiion &&
      firstWinningCombination === thirdWinningCombination
    ) {
      console.log(players[firstWinningCombination]);
      winner = players[firstWinningCombination].toUpperCase();
    }
  }

  function handleSquareClick(rowIndex, columnIndex) {
    setGameTurns((previousTurn) => {
      const currentPlayer = derivedActivePlayer(previousTurn);

      const updatedTurns = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...previousTurn,
      ];

      return updatedTurns;
    });
  }

  const gameDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newPlayer) {
    setPlayers((previousPlayers) => {
      return { ...previousPlayers, [symbol]: newPlayer };
    });
  }

  return (
    <>
      <header>
        <img src="game-logo.png" alt="tic-tac-toe game logo" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name="Player 1"
              symbol="X"
              isActive={activePlayer === "X" ? true : false}
              onPlayerNameChange={handlePlayerNameChange}
            />
            <Player
              name="Player 2"
              symbol="O"
              isActive={activePlayer === "O" ? true : false}
              onPlayerNameChange={handlePlayerNameChange}
            />
          </ol>
          {(winner || gameDraw) && (
            <GameOver winner={winner} onRestartClick={handleRestart} />
          )}
          <GameBoard
            onSquareClick={handleSquareClick}
            board={updatedGameBoard}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}
