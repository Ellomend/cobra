// Implementation type
export type ImplementationType = "OOP" | "FP";

// Function to initialize the selected implementation
export const initializeImplementation = (type: ImplementationType): void => {
  // Clear any existing content
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = "";

  // Import and initialize the selected implementation
  if (type === "OOP") {
    import("./core/Game").then(({ Game }) => {
      const game = new Game();
      game.start();

      // Handle cleanup when window is closed or navigated away from
      window.addEventListener("beforeunload", () => {
        game.cleanup();
      });
    });
  } else {
    import("./functional/core/game").then(({ startGame, cleanup }) => {
      startGame();

      // Handle cleanup when window is closed or navigated away from
      window.addEventListener("beforeunload", () => {
        cleanup();
      });
    });
  }
};
