import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [gameKey, setGameKey] = useState(Date.now()); // Unique key to restart game
  const [pressedKeys, setPressedKeys] = useState(""); // Store current word being typed
  const [guesses, setGuesses] = useState([]); // Store all guesses
  const [invalidInput, setInvalidInput] = useState(false); // Track invalid input state
  const [wordToGuess] = useState("HELLO"); // Set the word to guess (for demo purposes)
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [colors, setColors] = useState([]); // Store colors for each letter

  const startNewGame = () => {
    setGameKey(Date.now()); // Rerender game board
    setPressedKeys(""); // Clear pressed keys on new game
    setGuesses([]); // Reset guesses
    setInvalidInput(false); // Reset invalid input flag
    setColors([]); // Reset colors for the letters
    setGameOver(false); // Reset game over flag
  };

  const handleKeyPress = (key) => {
    if (gameOver) return; // Stop typing if game is over

    // Only allow alphabetic characters or special keys (Enter, Backspace)
    if (/[A-Z]/.test(key) && pressedKeys.length < 5) {
      setPressedKeys((prev) => prev + key);
      setInvalidInput(false);
    } else if (key === "Backspace" && pressedKeys.length > 0) {
      setPressedKeys(pressedKeys.slice(0, -1)); // Remove last character
      setInvalidInput(false);
    } else if (key === "Enter" && pressedKeys.length === 5) {
      checkWord();
    } else {
      setInvalidInput(true); // Invalid input triggered for non-alphabetic characters
    }
  };

  const checkWord = () => {
    const wordArray = pressedKeys.split("");
    let newColors = [];

    // Simulate checking the word (in a real game, compare against the correct word)
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === wordToGuess[i]) {
        newColors.push("green"); // Correct letter, correct position
      } else if (wordToGuess.includes(wordArray[i])) {
        newColors.push("yellow"); // Correct letter, wrong position
      } else {
        newColors.push("gray"); // Letter not in word
      }
    }

    setGuesses((prev) => [...prev, { word: pressedKeys, colors: newColors }]); // Add guess to guesses array
    setPressedKeys(""); // Clear typed letters

    if (pressedKeys === wordToGuess) {
      setGameOver(true); // Game over if correct word is guessed
    } else if (guesses.length === 4) {
      setGameOver(true); // Game over if 5 guesses are made
    }

    setColors(newColors);
  };

  return (
    <div className="container">
      <h1 className="title">Wordle Clone</h1>

      <button className="new-game-btn" onClick={startNewGame}>
        New Game
      </button>

      <button className="instructions-btn" onClick={() => setShowPopup(true)}>
        Instructions
      </button>

      {showPopup && (
        <div className="popup">
          <p>🟩 Green: Correct Letter & Position</p>
          <p>🟨 Yellow: Correct Letter, Wrong Position</p>
          <p>⬜ Gray: Letter Not in Word</p>
          <button className="close-popup" onClick={() => setShowPopup(false)}>
            X
          </button>
        </div>
      )}

      <div className="game-board" key={gameKey}>
        {/* Display the guesses made so far */}
        {Array.from({ length: 5 }).map((_, index) => {
          const guess = guesses[index];
          return (
            <div className="guess-row" key={index}>
              {(guess ? guess.word : "     ").split("").map((letter, i) => (
                <span
                  key={i}
                  className={`key-box ${guess ? guess.colors[i] : ""}`}
                >
                  {letter}
                </span>
              ))}
            </div>
          );
        })}

        {/* Show current typed input */}
        <div className="current-input">
          {pressedKeys.split("").map((key, index) => (
            <span key={index} className="key-box">{key}</span>
          ))}
        </div>

        {invalidInput && <span className="invalid-warning">Invalid character!</span>}
        {gameOver && (
          <div className="game-over">
            {guesses[guesses.length - 1]?.word === wordToGuess
              ? "You Win!"
              : "Game Over!"}
          </div>
        )}
      </div>

      <div className="keyboard">
        {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.split("").map((key) => (
              <button
                className="key"
                key={key}
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
            {rowIndex === 2 && (
              <>
                <button
                  className="key enter"
                  onClick={() => handleKeyPress("Enter")}
                >
                  Enter
                </button>
                <button
                  className="key backspace"
                  onClick={() => handleKeyPress("Backspace")}
                >
                  ⌫
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;









































