import "./style.css";
import { initializeImplementation } from "./factory";

// Create a UI for selecting the implementation
document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;

  // Create a selection UI
  app.innerHTML = `
    <div class="implementation-selector">
      <h1>Cobra</h1>
      <p>Select an implementation paradigm:</p>
      <div class="buttons">
        <button id="oop-button" class="paradigm-button">Object-Oriented Programming</button>
        <button id="fp-button" class="paradigm-button">Functional Programming</button>
      </div>
      <div class="paradigm-info">
        <div id="oop-info" class="info-box">
          <h2>Object-Oriented Programming</h2>
          <p>In the OOP implementation:</p>
          <ul>
            <li>Game logic is encapsulated in classes</li>
            <li>Each class has its own state and behavior</li>
            <li>Classes interact through well-defined interfaces</li>
            <li>Inheritance and polymorphism can be used for code reuse</li>
          </ul>
        </div>
        <div id="fp-info" class="info-box">
          <h2>Functional Programming</h2>
          <p>In the FP implementation:</p>
          <ul>
            <li>Functions are the primary building blocks</li>
            <li>State is immutable and transformed through pure functions</li>
            <li>Functions are composed to create complex behavior</li>
            <li>Side effects are minimized and isolated</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Add event listeners to the buttons
  const oopButton = document.getElementById("oop-button");
  const fpButton = document.getElementById("fp-button");

  if (oopButton && fpButton) {
    oopButton.addEventListener("click", () => {
      initializeImplementation("OOP");
    });

    fpButton.addEventListener("click", () => {
      initializeImplementation("FP");
    });
  }
});
