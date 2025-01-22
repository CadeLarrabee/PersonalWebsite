//The screenzone, responsible for controlling the view.
import "../css/ScreenZone.css";
//import PropTypes from "prop-types";

const ScreenZone = () => {
  return <div className="crt-screen"></div>;
};

const triggerFlicker = () => {
  const crtScreen = document.querySelector(".crt-screen::before");

  if (!crtScreen) return;

  // Add the animation class
  crtScreen.style.animation = "crt-flicker 0.1s";

  // Remove the animation class after it completes
  setTimeout(() => {
    crtScreen.style.animation = "none";
  }, 100); // Match the animation duration
};

// Function to trigger the flicker at random intervals
const startRandomFlicker = () => {
  const randomInterval = Math.random() * (120000 - 10000) + 10000; // Random time between 10s and 2 minutes
  setTimeout(() => {
    triggerFlicker();
    startRandomFlicker(); // Call recursively to repeat the random intervals
  }, randomInterval);
};

// Start the random flicker effect
startRandomFlicker();

export default ScreenZone;

ScreenZone.propTypes = {};
