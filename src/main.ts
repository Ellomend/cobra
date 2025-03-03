import "./style.css";
import { Game } from "./core/Game";

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.start();

  // Handle cleanup when window is closed or navigated away from
  window.addEventListener("beforeunload", () => {
    game.cleanup();
  });
});
