// Game types
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
export type Snake = Position[];

export type GameState = {
  snake: Snake;
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  isGameOver: boolean;
  score: number;
};
