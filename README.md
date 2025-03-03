# Snake Game

A classic Snake game implemented in TypeScript with a modern, modular architecture.

## Project Structure

The project follows a component-based architecture with clear separation of concerns:

```
src/
├── config/         # Game configuration constants
├── core/           # Core game logic and types
├── entities/       # Game entities (Snake, Food)
├── ui/             # UI components and input handling
├── utils/          # Utility functions
├── main.ts         # Entry point
└── style.css       # Styling
```

## Architecture Overview

The game is organized using object-oriented principles with the following key components:

1. **Game Class** (`core/Game.ts`): Central controller that manages the game loop, state, and coordinates between components.

2. **Entities**:
   - `Snake` (`entities/Snake.ts`): Manages snake movement, growth, and collision detection.
   - `Food` (`entities/Food.ts`): Handles food generation and detection of when it's eaten.

3. **UI Components**:
   - `Renderer` (`ui/Renderer.ts`): Handles all canvas rendering.
   - `InputHandler` (`ui/InputHandler.ts`): Manages keyboard input and button events.

4. **Configuration** (`config/gameConfig.ts`): Centralizes game constants and settings.

5. **Types** (`core/types.ts`): Defines TypeScript types used throughout the application.

6. **Utilities** (`utils/helpers.ts`): Contains reusable helper functions.

## Design Patterns Used

- **Component-Based Architecture**: Each part of the game is encapsulated in its own class with specific responsibilities.
- **Dependency Injection**: Components receive their dependencies through constructors.
- **Observer Pattern**: For handling events and communication between components.
- **State Management**: Game state is managed centrally but accessed through appropriate interfaces.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Build for production: `npm run build`

## Controls

- Use arrow keys or WASD to control the snake
- Eat food to grow and earn points
- Avoid hitting walls or yourself
- Press the Restart button to start a new game

## Future Improvements

- Add difficulty levels
- Implement high score tracking
- Add mobile touch controls
- Create power-ups and obstacles 