import CrtScreenOverlay from "./components/CrtScreenOverlay";
import CartridgeRow from "./components/CartridgeRow";
import "./css/global.css";

function App() {
  return (
    <CrtScreenOverlay>
      <CartridgeRow />
    </CrtScreenOverlay>
  );
}

export default App;
