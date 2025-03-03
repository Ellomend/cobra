import { Position, Snake, Direction, GameState } from "../core/types";
import { GRID_SIZE } from "../config/gameConfig";

/**
 * Check if two positions are the same
 */
export const isSamePosition = (pos1: Position, pos2: Position): boolean =>
  pos1.x === pos2.x && pos1.y === pos2.y;

/**
 * Generate a random integer between min (inclusive) and max (exclusive)
 */
export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

/**
 * Format score with leading zeros
 */
export const formatScore = (score: number, length: number = 5): string =>
  score.toString().padStart(length, "0");

/**
 * Generate a new food position that doesn't overlap with the snake
 */
export const generateFoodPosition = (snake: Snake): Position => {
  let position: Position;
  do {
    position = {
      x: getRandomInt(0, GRID_SIZE),
      y: getRandomInt(0, GRID_SIZE),
    };
  } while (snake.some((segment) => isSamePosition(segment, position)));

  return position;
};

/**
 * Calculate the new head position based on current head and direction
 */
export const calculateNewHead = (
  head: Position,
  direction: Direction
): Position => {
  const newHead = { ...head };

  switch (direction) {
    case "UP":
      newHead.y -= 1;
      break;
    case "DOWN":
      newHead.y += 1;
      break;
    case "LEFT":
      newHead.x -= 1;
      break;
    case "RIGHT":
      newHead.x += 1;
      break;
  }

  return newHead;
};

/**
 * Check if the snake has collided with the wall
 */
export const hasCollidedWithWall = (head: Position): boolean =>
  head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;

/**
 * Check if the snake has collided with itself
 */
export const hasCollidedWithSelf = (snake: Snake): boolean => {
  const head = snake[0];
  return snake.slice(1).some((segment) => isSamePosition(segment, head));
};

/**
 * Check if the direction change is valid (can't do a 180-degree turn)
 */
export const isValidDirectionChange = (
  currentDirection: Direction,
  newDirection: Direction
): boolean => {
  return !(
    (currentDirection === "UP" && newDirection === "DOWN") ||
    (currentDirection === "DOWN" && newDirection === "UP") ||
    (currentDirection === "LEFT" && newDirection === "RIGHT") ||
    (currentDirection === "RIGHT" && newDirection === "LEFT")
  );
};

/**
 * Create a debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};
