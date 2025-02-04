import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const VolumeContext = createContext();

// Controls the volume for the whole website.
export const VolumeProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <VolumeContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </VolumeContext.Provider>
  );
};

VolumeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

//I have no idea what this warning actually means in context
export const useVolume = () => useContext(VolumeContext);

export { VolumeProvider as default };
