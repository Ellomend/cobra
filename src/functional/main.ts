import "../style.css";
import { startGame, cleanup } from "./core/game";

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  startGame();

  // Handle cleanup when window is closed or navigated away from
  window.addEventListener("beforeunload", () => {
    cleanup();
  });
});
