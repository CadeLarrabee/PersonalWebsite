import { useEffect } from "react";
import "../css/IdleScreen.css";

const IdleScreen = () => {
  useEffect(() => {
    // Check if the sound has already played in this session
    const hasPlayed = sessionStorage.getItem("startupSoundPlayed");

    if (!hasPlayed) {
      const startupSound = new Audio("../public/sounds/os_startup.mp3");
      startupSound
        .play()
        .catch((err) => console.error("Audio play error:", err));

      // Mark it as played so it doesn't play again until a refresh
      sessionStorage.setItem("startupSoundPlayed", "true");
    }
  }, []);

  return (
    <div className="windowWrapper">
      {/* Windows 98 Header Bar */}
      <div className="win98-header">
        <span className="win98-title">Internet Explorer</span>
        <div className="win98-buttons">
          <div className="win98-btn minimize"></div>
          <div className="win98-btn maximize"></div>
          <div className="win98-btn close"></div>
        </div>
      </div>

      {/* Windows 98 Project Window */}
      <div className="window98">
        <div className="title-bar">
          <span className="title-text">My Project</span>
        </div>
        <div className="window-content">
          <p>Welcome to my Windows 98-inspired project window!</p>
          <p>
            This is a static page with no close, minimize, or maximize buttons.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdleScreen;
