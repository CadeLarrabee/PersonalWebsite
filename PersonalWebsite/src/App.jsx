import CrtScreenOverlay from "./components/CrtScreenOverlay";
import VolumeProvider from "./context/VolumeProvider";
import VolumeButton from "./components/VolumeButton";
import CartridgeRow from "./components/CartridgeRow";

import "./css/global.css";

function App() {
  return (
    <>
      <VolumeProvider>
        <VolumeButton />
        <CrtScreenOverlay />
        <CartridgeRow />
      </VolumeProvider>
    </>
  );
}

export default App;
