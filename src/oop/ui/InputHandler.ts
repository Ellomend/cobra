import { Direction } from "../core/types.ts";
import { Snake } from "../entities/Snake.ts";

export class InputHandler {
  private snake: Snake;
  private restartCallback: () => void;

  constructor(snake: Snake, restartCallback: () => void) {
    this.snake = snake;
    this.restartCallback = restartCallback;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener("keydown", this.handleKeydown.bind(this));

    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.addEventListener("click", this.restartCallback);
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
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
      this.snake.setDirection(newDirection);
    }
  }

  public cleanup(): void {
    window.removeEventListener("keydown", this.handleKeydown.bind(this));

    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.removeEventListener("click", this.restartCallback);
    }
  }
}
