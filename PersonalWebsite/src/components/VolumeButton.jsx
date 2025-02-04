import { useVolume } from "../context/VolumeProvider";
import "../css/VolumeButton.css";

const VolumeButton = () => {
  const { isMuted, toggleMute } = useVolume();
  //might come back and make this an image later

  return (
    <button className="volume-button" onClick={toggleMute}>
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
};

export default VolumeButton;
