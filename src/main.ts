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

  // Add some styles for the selector
  const style = document.createElement("style");
  style.textContent = `
    .implementation-selector {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
    
    .buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 30px 0;
    }
    
    .paradigm-button {
      padding: 15px 30px;
      font-size: 18px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .paradigm-button:hover {
      background-color: #3e8e41;
    }
    
    .paradigm-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 30px;
    }
    
    .info-box {
      flex: 1;
      text-align: left;
      padding: 20px;
      background-color:rgb(12, 50, 61);
      border-radius: 5px;
    }
    
    .info-box h2 {
      margin-top: 0;
      color: #4CAF50;
    }
    
    .info-box ul {
      padding-left: 20px;
    }
  `;
  document.head.appendChild(style);

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
console.log("12234");

const double = (n: number): number => n * 2;

const lift =
  <T, U>(fn: (x: T) => U) =>
  (arr: T[]): U[] =>
    arr.map(fn);

const liftedDouble = lift(double);

console.log(liftedDouble([1, 2, 3])); // ✅ Works: [2, 4, 6]
console.log(liftedDouble(["1", "2", "3"])); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.
