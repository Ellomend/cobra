import { GameState, Position, Snake } from "../core/types";
import {
  CANVAS_SIZE,
  CELL_SIZE,
  GRID_SIZE,
  COLORS,
} from "../config/gameConfig";

// Canvas and DOM elements
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let scoreElement: HTMLElement;

// Setup HTML structure
export const setupHtml = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div class="game-container">
      <h1>Snake Game</h1>
      <div class="score-container">Score: <span id="score">0</span></div>
      <canvas id="game-canvas" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>
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

  // Get canvas and context
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d")!;
  scoreElement = document.getElementById("score") as HTMLElement;
};

// Clear the canvas
export const clearCanvas = (): void => {
  ctx.fillStyle = COLORS.BACKGROUND;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

// Draw grid lines
export const drawGrid = (): void => {
  ctx.strokeStyle = COLORS.GRID_LINES;
  ctx.lineWidth = 0.5;

  for (let i = 0; i <= GRID_SIZE; i++) {
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
    ctx.stroke();

    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
    ctx.stroke();
  }
};

// Draw the snake
export const drawSnake = (snake: Snake): void => {
  snake.forEach((segment, index) => {
    // Head is a different color
    ctx.fillStyle = index === 0 ? COLORS.SNAKE_HEAD : COLORS.SNAKE_BODY;

    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Draw a border around each segment
    ctx.strokeStyle = COLORS.BACKGROUND;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
};

// Draw the food
export const drawFood = (food: Position): void => {
  ctx.fillStyle = COLORS.FOOD;
  ctx.beginPath();
  ctx.arc(
    food.x * CELL_SIZE + CELL_SIZE / 2,
    food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

// Draw game over message
export const drawGameOver = (score: number): void => {
  ctx.fillStyle = COLORS.GAME_OVER_OVERLAY;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.fillStyle = COLORS.TEXT;
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 15);

  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 15);

  ctx.fillText(
    "Press Restart to play again",
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 + 45
  );
};

// Update the score display
export const updateScore = (score: number): void => {
  if (scoreElement) {
    scoreElement.textContent = score.toString();
  }
};

// Render the entire game
export const renderGame = (state: GameState): void => {
  clearCanvas();
  drawGrid();
  drawSnake(state.snake);
  drawFood(state.food);

  if (state.isGameOver) {
    drawGameOver(state.score);
  }
};
