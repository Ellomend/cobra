import { GameState } from "./types.ts";
import { Snake } from "../entities/Snake.ts";
import { Food } from "../entities/Food.ts";
import { Renderer } from "../ui/Renderer.ts";
import { InputHandler } from "../ui/InputHandler.ts";
import { GAME_SPEED } from "../config/gameConfig.ts";

export class Game {
  private snake: Snake;
  private food: Food;
  private renderer: Renderer;
  private inputHandler: InputHandler;
  private gameLoopId: number | null = null;
  private score: number = 0;
  private isGameOver: boolean = false;

  constructor() {
    // Create HTML structure
    this.setupHtml();

    // Initialize game components
    this.snake = new Snake();
    this.food = new Food(this.snake.body);
    this.renderer = new Renderer("game-canvas", "score");
    this.inputHandler = new InputHandler(this.snake, this.restart.bind(this));
  }

  private setupHtml(): void {
    const app = document.querySelector<HTMLDivElement>("#app")!;
    app.innerHTML = `
      <div class="game-container">
        <h1>Snake Game</h1>
        <div class="score-container">Score: <span id="score">0</span></div>
        <canvas id="game-canvas" width="400" height="400"></canvas>
        <div class="controls">
          <button id="restart-button">Restart Game</button>
        </div>
        <div class="instructions">
          <p>Use arrow keys or WASD to control the snake.</p>
          <p>Eat the food to grow and earn points.</p>
          <p>Don't hit the walls or yourself!</p>
        </div>
      </div>
    `;
  }

  public start(): void {
    this.gameLoop();
  }

  private gameLoop(): void {
    if (this.isGameOver) return;

    this.update();
    this.render();

    this.gameLoopId = window.setTimeout(() => this.gameLoop(), GAME_SPEED);
  }

  private update(): void {
    // Move the snake
    this.snake.move();

    // Check for collisions
    if (this.snake.hasCollidedWithWall() || this.snake.hasCollidedWithSelf()) {
      this.isGameOver = true;
      return;
    }

    // Check if snake ate food
    if (this.food.isEatenBy(this.snake.head)) {
      // Generate new food
      this.food.respawn(this.snake.body);

      // Increase score
      this.score += 10;
      this.renderer.updateScore(this.score);
    } else {
      // Remove tail if no food was eaten
      this.snake.removeTail();
    }
  }

  private render(): void {
    this.renderer.render(
      this.snake.body,
      this.food.pos,
      this.isGameOver,
      this.score
    );
  }

  public restart(): void {
    // Clear any existing game loop
    if (this.gameLoopId !== null) {
      clearTimeout(this.gameLoopId);
      this.gameLoopId = null;
    }

    // Reset game state
    this.snake.reset();
    this.food = new Food(this.snake.body);
    this.score = 0;
    this.isGameOver = false;
    this.renderer.updateScore(0);

    // Start the game loop again
    this.start();
  }

  public getState(): GameState {
    return {
      snake: this.snake.body,
      food: this.food.pos,
      direction: this.snake.currentDirection,
      nextDirection: this.snake.currentDirection,
      isGameOver: this.isGameOver,
      score: this.score,
    };
  }

  public cleanup(): void {
    if (this.gameLoopId !== null) {
      clearTimeout(this.gameLoopId);
    }
    this.inputHandler.cleanup();
  }
}
