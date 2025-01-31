import { useEffect } from "react";
import DomManip from "./Battleship/DomManipulator.js"; // Update this path
import "./Battleship/style.css"; // Import the game-specific styles

const BattleShipApp = () => {
  useEffect(() => {
    // Initialize the game logic
    const domManip = new DomManip();
    domManip.onEntry();

    // Optional: Cleanup if needed
    return () => {
      // Add cleanup logic if DomManip attaches event listeners or modifies the DOM in a persistent way
    };
  }, []);

  return <div className="BattleShipApp"></div>;
};

export default BattleShipApp;
