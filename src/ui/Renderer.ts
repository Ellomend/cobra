import { Position, Snake } from "../core/types";
import {
  CANVAS_SIZE,
  CELL_SIZE,
  GRID_SIZE,
  COLORS,
} from "../config/gameConfig";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scoreElement: HTMLElement;

  constructor(canvasId: string, scoreElementId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.scoreElement = document.getElementById(scoreElementId) as HTMLElement;
  }

  clearCanvas(): void {
    this.ctx.fillStyle = COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  drawGrid(): void {
    this.ctx.strokeStyle = COLORS.GRID_LINES;
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i <= GRID_SIZE; i++) {
      // Vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(i * CELL_SIZE, 0);
      this.ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      this.ctx.stroke();

      // Horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * CELL_SIZE);
      this.ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      this.ctx.stroke();
    }
  }

  drawSnake(snake: Snake): void {
    snake.forEach((segment, index) => {
      // Head is a different color
      if (index === 0) {
        this.ctx.fillStyle = COLORS.SNAKE_HEAD;
      } else {
        this.ctx.fillStyle = COLORS.SNAKE_BODY;
      }

      this.ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      // Draw a border around each segment
      this.ctx.strokeStyle = COLORS.BACKGROUND;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  }

  drawFood(food: Position): void {
    this.ctx.fillStyle = COLORS.FOOD;
    this.ctx.beginPath();
    this.ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  drawGameOver(score: number): void {
    this.ctx.fillStyle = COLORS.GAME_OVER_OVERLAY;
    this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    this.ctx.fillStyle = COLORS.TEXT;
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over!", CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 15);

    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 15);

    this.ctx.fillText(
      "Press Restart to play again",
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2 + 45
    );
  }

  updateScore(score: number): void {
    this.scoreElement.textContent = score.toString();
  }

  render(
    snake: Snake,
    food: Position,
    isGameOver: boolean,
    score: number
  ): void {
    this.clearCanvas();
    this.drawGrid();
    this.drawSnake(snake);
    this.drawFood(food);

    if (isGameOver) {
      this.drawGameOver(score);
    }
  }
}
