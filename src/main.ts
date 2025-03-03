import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

// Game constants
const GRID_SIZE = 20;
const GAME_SPEED = 100; // milliseconds
const CANVAS_SIZE = 400;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

// Game state
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };
type Snake = Position[];
type GameState = {
  snake: Snake;
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  isGameOver: boolean;
  score: number;
};

// Initialize the game state
const gameState: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: generateFoodPosition([{ x: 10, y: 10 }]),
  direction: "RIGHT",
  nextDirection: "RIGHT",
  isGameOver: false,
  score: 0,
};

// Setup the game canvas
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

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const scoreElement = document.getElementById("score") as HTMLSpanElement;
const restartButton = document.getElementById(
  "restart-button"
) as HTMLButtonElement;

// Generate a random food position
function generateFoodPosition(snake: Snake): Position {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    )
  );

  return position;
}

// Check if two positions are the same
function isSamePosition(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Check if the snake has collided with itself or the walls
function checkCollision(snake: Snake): boolean {
  const head = snake[0];

  // Check wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }

  // Check self collision (skip the head)
  for (let i = 1; i < snake.length; i++) {
    if (isSamePosition(head, snake[i])) {
      return true;
    }
  }

  return false;
}

// Update the game state
function update(): void {
  if (gameState.isGameOver) return;

  // Update direction
  gameState.direction = gameState.nextDirection;

  // Calculate new head position
  const head = { ...gameState.snake[0] };

  switch (gameState.direction) {
    case "UP":
      head.y -= 1;
      break;
    case "DOWN":
      head.y += 1;
      break;
    case "LEFT":
      head.x -= 1;
      break;
    case "RIGHT":
      head.x += 1;
      break;
  }

  // Check for collision
  gameState.snake.unshift(head);

  if (checkCollision(gameState.snake)) {
    gameState.isGameOver = true;
    return;
  }

  // Check if snake ate food
  if (isSamePosition(head, gameState.food)) {
    // Generate new food
    gameState.food = generateFoodPosition(gameState.snake);
    // Increase score
    gameState.score += 10;
    scoreElement.textContent = gameState.score.toString();
  } else {
    // Remove tail if no food was eaten
    gameState.snake.pop();
  }
}

// Render the game
function render(): void {
  // Clear canvas
  ctx.fillStyle = "#242424";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Draw grid lines
  ctx.strokeStyle = "#333";
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

  // Draw snake
  gameState.snake.forEach((segment, index) => {
    // Head is a different color
    if (index === 0) {
      ctx.fillStyle = "#4CAF50"; // Green head
    } else {
      ctx.fillStyle = "#8BC34A"; // Lighter green body
    }

    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Draw a border around each segment
    ctx.strokeStyle = "#242424";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });

  // Draw food
  ctx.fillStyle = "#FF5722"; // Orange food
  ctx.beginPath();
  ctx.arc(
    gameState.food.x * CELL_SIZE + CELL_SIZE / 2,
    gameState.food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Draw game over message
  if (gameState.isGameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 15);
    ctx.font = "20px Arial";
    ctx.fillText(
      `Score: ${gameState.score}`,
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2 + 15
    );
    ctx.fillText(
      "Press Restart to play again",
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2 + 45
    );
  }
}

// Game loop
function gameLoop(): void {
  update();
  render();

  if (!gameState.isGameOver) {
    setTimeout(gameLoop, GAME_SPEED);
  }
}

// Handle keyboard input
function handleKeydown(event: KeyboardEvent): void {
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

  // Don't change direction if game is over
  if (gameState.isGameOver) return;

  // Determine the new direction based on key pressed
  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (gameState.direction !== "DOWN") {
        gameState.nextDirection = "UP";
      }
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (gameState.direction !== "UP") {
        gameState.nextDirection = "DOWN";
      }
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (gameState.direction !== "RIGHT") {
        gameState.nextDirection = "LEFT";
      }
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (gameState.direction !== "LEFT") {
        gameState.nextDirection = "RIGHT";
      }
      break;
  }
}

// Reset the game
function resetGame(): void {
  gameState.snake = [{ x: 10, y: 10 }];
  gameState.food = generateFoodPosition([{ x: 10, y: 10 }]);
  gameState.direction = "RIGHT";
  gameState.nextDirection = "RIGHT";
  gameState.isGameOver = false;
  gameState.score = 0;
  scoreElement.textContent = "0";

  // Start the game loop
  gameLoop();
}

// Event listeners
window.addEventListener("keydown", handleKeydown);
restartButton.addEventListener("click", resetGame);

// Start the game
resetGame();
