export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        return (
          <li key={`${turn.square.row}${turn.square.column}`}>
            {turn.player} selected row {turn.square.row} , column{" "}
            {turn.square.column}
          </li>
        );
      })}
    </ol>
  );
}
