export const gameOverScreen = document.getElementById("game-over");

export default function GameOver({ winner, onRestartClick }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner ? <p>Winner {winner}!!</p> : <p>Game Draw.....</p>}
      <button onClick={onRestartClick}>Restart</button>
    </div>
  );
}
