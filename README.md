# Snake Game

A classic Snake game implemented in TypeScript with both Object-Oriented Programming (OOP) and Functional Programming (FP) paradigms. This project allows you to switch between implementations to compare the differences and similarities between these two programming approaches.

## Project Structure

The project is organized into two main implementations:

```
src/
├── core/           # OOP implementation core
├── entities/       # OOP implementation entities
├── ui/             # OOP implementation UI components
├── utils/          # OOP implementation utilities
├── config/         # OOP implementation configuration
├── functional/     # Functional implementation
│   ├── core/       # FP core logic
│   ├── entities/   # FP entities (conceptual)
│   ├── ui/         # FP UI components
│   ├── utils/      # FP utilities
│   └── config/     # FP configuration
├── factory.ts      # Factory for switching implementations
├── main.ts         # Entry point
└── style.css       # Styling
```

## OOP Implementation

The OOP implementation follows a component-based architecture with clear separation of concerns:

### Key Components

1. **Game Class** (`core/Game.ts`): Central controller that manages the game loop, state, and coordinates between components.

2. **Entities**:
   - `Snake` (`entities/Snake.ts`): Manages snake movement, growth, and collision detection.
   - `Food` (`entities/Food.ts`): Handles food generation and detection of when it's eaten.

3. **UI Components**:
   - `Renderer` (`ui/Renderer.ts`): Handles all canvas rendering.
   - `InputHandler` (`ui/InputHandler.ts`): Manages keyboard input and button events.

### OOP Design Patterns

- **Component-Based Architecture**: Each part of the game is encapsulated in its own class with specific responsibilities.
- **Dependency Injection**: Components receive their dependencies through constructors.
- **Observer Pattern**: For handling events and communication between components.
- **State Management**: Game state is managed centrally but accessed through appropriate interfaces.

## Functional Implementation

The functional implementation follows FP principles with pure functions and immutable data:

### Key Components

1. **Game State** (`functional/core/game.ts`): Defines the game state and pure functions to transform it.

2. **Pure Functions**:
   - State transformation functions that take the current state and return a new state.
   - UI rendering functions that take state and produce visual output.
   - Helper functions for calculations and validations.

3. **Side Effects**:
   - Isolated in specific areas (DOM manipulation, event handling).
   - Clearly separated from pure logic.

### FP Design Patterns

- **Pure Functions**: Functions that don't have side effects and always return the same output for the same input.
- **Immutability**: State is never modified directly; instead, new state is created based on the old state.
- **Function Composition**: Building complex behavior by combining simpler functions.
- **Higher-Order Functions**: Functions that take other functions as arguments or return functions.

## Comparing the Paradigms

### OOP Strengths
- Natural modeling of game entities with state and behavior
- Encapsulation of implementation details
- Clear organization of code into logical units
- Familiar to many developers

### FP Strengths
- Easier to reason about state changes
- Better testability of pure functions
- Reduced bugs from unexpected state mutations
- More declarative code style

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Choose between OOP and FP implementations in the UI
5. Build for production: `npm run build`

## Controls

- Use arrow keys or WASD to control the snake
- Eat food to grow and earn points
- Avoid hitting walls or yourself
- Press the Restart button to start a new game

## Learning Resources

If you're new to functional programming, here are some resources to help you understand the FP implementation:

- [Functional Programming in JavaScript](https://www.manning.com/books/functional-programming-in-javascript)
- [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)
- [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS)

## Future Improvements

- Add difficulty levels
- Implement high score tracking
- Add mobile touch controls
- Create power-ups and obstacles 