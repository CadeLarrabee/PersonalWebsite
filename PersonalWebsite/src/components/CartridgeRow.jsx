import FloppyDisk from "./FloppyDisk";
import "../css/CartridgeRow.css";
import "../css/HandWriting.css";

const CartridgeRow = () => {
  const floppyDisks = [
    { id: 1, color: "#4A90E2", upperColor: "#357ABD", handWriting: "note1" },
    { id: 2, color: "#111111", upperColor: "#3BB29D", handWriting: "note2" },
    { id: 3, color: "#F5A623", upperColor: "#D98518", handWriting: "note3" },
    { id: 4, color: "#E94E77", upperColor: "#B33A59", handWriting: "note4" },
    { id: 5, color: "#B8E986", upperColor: "#8FCA65", handWriting: "note5" },
  ];

  return (
    <div className="cartridge-row">
      {floppyDisks.map((disk) => (
        <div key={disk.id} className="floppy-container">
          <FloppyDisk
            key={disk.id}
            floppyDiskBackground={disk.color}
            upperFloppyDiskBackground={disk.upperColor}
            handWriting={disk.handWriting}
          />
        </div>
      ))}
    </div>
  );
};

export default CartridgeRow;
