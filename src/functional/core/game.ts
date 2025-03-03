import { GameState, Direction } from "./types";
import { GAME_SPEED } from "../config/gameConfig";
import {
  generateFoodPosition,
  calculateNewHead,
  hasCollidedWithWall,
  hasCollidedWithSelf,
  isSamePosition,
  isValidDirectionChange,
} from "../utils/helpers";
import { renderGame, updateScore, setupHtml } from "../ui/renderer";
import { setupInputHandlers, cleanupInputHandlers } from "../ui/inputHandler";

// Game state (mutable for simplicity)
let gameState: GameState;
let gameLoopId: number | null = null;

// Initial game state
export const createInitialState = (): GameState => ({
  snake: [{ x: 10, y: 10 }],
  food: generateFoodPosition([{ x: 10, y: 10 }]),
  direction: "RIGHT",
  nextDirection: "RIGHT",
  isGameOver: false,
  score: 0,
});

// Pure function to update the game state
export const updateGameState = (state: GameState): GameState => {
  if (state.isGameOver) return state;

  // Update direction
  const direction = state.nextDirection;

  // Calculate new head position
  const head = state.snake[0];
  const newHead = calculateNewHead(head, direction);

  // Create a new snake with the new head
  const newSnake = [newHead, ...state.snake];

  // Check for collisions
  if (hasCollidedWithWall(newHead) || hasCollidedWithSelf(newSnake)) {
    return {
      ...state,
      snake: newSnake,
      direction,
      isGameOver: true,
    };
  }

  // Check if snake ate food
  const ateFood = isSamePosition(newHead, state.food);

  // Create the updated snake (remove tail if no food was eaten)
  const updatedSnake = ateFood ? newSnake : newSnake.slice(0, -1);

  // Generate new food if needed
  const food = ateFood ? generateFoodPosition(updatedSnake) : state.food;

  // Update score
  const score = ateFood ? state.score + 10 : state.score;

  // Return the new state
  return {
    ...state,
    snake: updatedSnake,
    food,
    direction,
    score,
  };
};

// Function to handle direction changes
export const changeDirection = (newDirection: Direction): void => {
  if (gameState && !gameState.isGameOver) {
    if (isValidDirectionChange(gameState.direction, newDirection)) {
      gameState = {
        ...gameState,
        nextDirection: newDirection,
      };
    }
  }
};

// Game loop
export const gameLoop = (): void => {
  // Update game state
  gameState = updateGameState(gameState);

  // Update UI
  renderGame(gameState);
  if (gameState.score > 0) {
    updateScore(gameState.score);
  }

  // Continue the loop if game is not over
  if (!gameState.isGameOver) {
    gameLoopId = window.setTimeout(gameLoop, GAME_SPEED);
  }
};

export const startGame = (): void => {
  // Setup HTML
  setupHtml();

  // Initialize game state
  gameState = createInitialState();

  // Setup input handlers
  setupInputHandlers();

  // Start the game loop
  gameLoop();
};

export const resetGame = (): void => {
  // Clear any existing game loop
  if (gameLoopId !== null) {
    clearTimeout(gameLoopId);
    gameLoopId = null;
  }

  // Reset game state
  gameState = createInitialState();
  updateScore(0);

  // Start the game loop again
  gameLoop();
};

export const cleanup = (): void => {
  if (gameLoopId !== null) {
    clearTimeout(gameLoopId);
    gameLoopId = null;
  }

  // Clean up input handlers
  cleanupInputHandlers();
};
