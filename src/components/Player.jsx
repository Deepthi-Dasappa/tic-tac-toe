import { useState } from "react";

export default function Player({ name, symbol, isActive, onPlayerNameChange }) {
  let [isEditing, setIsEditing] = useState(false);
  let [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    setIsEditing((editing) => {
      return !editing;
    });

    if (isEditing) {
      onPlayerNameChange(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function handleKeyDown(event) {
    console.log("Event : ", event.key);
    if (event.key === "Enter") {
      handleEditClick();
    }
  }

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
            autoFocus
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
