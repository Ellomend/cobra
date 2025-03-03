import { Position, Snake } from "../core/types.ts";
import { GRID_SIZE } from "../config/gameConfig.ts";

export class Food {
  private position: Position;

  constructor(snake: Snake) {
    this.position = this.generatePosition(snake);
  }

  get pos(): Position {
    return this.position;
  }

  generatePosition(snake: Snake): Position {
    let newPosition: Position;
    do {
      newPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newPosition.x && segment.y === newPosition.y
      )
    );

    return newPosition;
  }

  isEatenBy(position: Position): boolean {
    return position.x === this.position.x && position.y === this.position.y;
  }

  respawn(snake: Snake): void {
    this.position = this.generatePosition(snake);
  }
}
