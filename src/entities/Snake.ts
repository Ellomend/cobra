import { Direction, Position, Snake as SnakeType } from "../core/types";
import { GRID_SIZE } from "../config/gameConfig";

export class Snake {
  private segments: SnakeType;
  private direction: Direction;
  private nextDirection: Direction;

  constructor(initialPosition: Position = { x: 10, y: 10 }) {
    this.segments = [initialPosition];
    this.direction = "RIGHT";
    this.nextDirection = "RIGHT";
  }

  get body(): SnakeType {
    return this.segments;
  }

  get head(): Position {
    return this.segments[0];
  }

  get currentDirection(): Direction {
    return this.direction;
  }

  setDirection(newDirection: Direction): void {
    // Prevent 180-degree turns
    if (
      (this.direction === "UP" && newDirection === "DOWN") ||
      (this.direction === "DOWN" && newDirection === "UP") ||
      (this.direction === "LEFT" && newDirection === "RIGHT") ||
      (this.direction === "RIGHT" && newDirection === "LEFT")
    ) {
      return;
    }

    this.nextDirection = newDirection;
  }

  move(): void {
    // Update direction
    this.direction = this.nextDirection;

    // Calculate new head position
    const newHead = { ...this.head };

    switch (this.direction) {
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

    // Add new head to the beginning of the snake
    this.segments.unshift(newHead);
  }

  removeTail(): void {
    this.segments.pop();
  }

  hasCollidedWithWall(): boolean {
    const head = this.head;
    return (
      head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE
    );
  }

  hasCollidedWithSelf(): boolean {
    const head = this.head;
    // Skip the head (index 0) when checking
    for (let i = 1; i < this.segments.length; i++) {
      if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
        return true;
      }
    }
    return false;
  }

  reset(initialPosition: Position = { x: 10, y: 10 }): void {
    this.segments = [initialPosition];
    this.direction = "RIGHT";
    this.nextDirection = "RIGHT";
  }
}
