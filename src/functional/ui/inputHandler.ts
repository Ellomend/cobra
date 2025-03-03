import { Direction } from "../core/types";
import { changeDirection, resetGame } from "../core/game";

// Event listeners
let keydownListener: (event: KeyboardEvent) => void;
let restartButtonListener: () => void;

// Setup input handlers
export const setupInputHandlers = (): void => {
  // Handle keyboard input
  keydownListener = (event: KeyboardEvent): void => {
    // Prevent default behavior for arrow keys
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "w",
        "a",
        "s",
        "d",
      ].includes(event.key)
    ) {
      event.preventDefault();
    }

    // Determine the new direction based on key pressed
    let newDirection: Direction | null = null;

    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        newDirection = "UP";
        break;
      case "ArrowDown":
      case "s":
      case "S":
        newDirection = "DOWN";
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        newDirection = "LEFT";
        break;
      case "ArrowRight":
      case "d":
      case "D":
        newDirection = "RIGHT";
        break;
    }

    if (newDirection) {
      // We're using a global gameState in game.ts, so we don't need to pass it here
      // The changeDirection function will access and update the global state
      changeDirection(newDirection);
    }
  };

  // Handle restart button
  restartButtonListener = resetGame;

  // Add event listeners
  window.addEventListener("keydown", keydownListener);

  const restartButton = document.getElementById("restart-button");
  if (restartButton) {
    restartButton.addEventListener("click", restartButtonListener);
  }
};

// Clean up event listeners
export const cleanupInputHandlers = (): void => {
  window.removeEventListener("keydown", keydownListener);

  const restartButton = document.getElementById("restart-button");
  if (restartButton) {
    restartButton.removeEventListener("click", restartButtonListener);
  }
};
