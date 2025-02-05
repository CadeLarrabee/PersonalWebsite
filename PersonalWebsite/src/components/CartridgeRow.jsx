import { useState } from "react";
import FloppyDisk from "./FloppyDisk";
import { RoutesUrl } from "./ScreenZone";
import { useVolume } from "../context/VolumeProvider";
//import PropTypes from "prop-types";
import "../css/CartridgeRow.css";
import "../css/HandWriting.css";
import { Link } from "react-router-dom";

const CartridgeRow = () => {
  const initialDisks = [
    {
      id: 1,
      color: "#4A90E2",
      upperColor: "#357ABD",
      handWriting: "BattleShipApp",
      href: RoutesUrl.BattleShipApp,
    },
    {
      id: 2,
      color: "#111111",
      upperColor: "#3BB29D",
      handWriting: "StorePageApp",
      href: RoutesUrl.StorePageApp,
    },
    {
      id: 3,
      color: "#F5A623",
      upperColor: "#D98518",
      handWriting: "MessageBoardApp",
      href: RoutesUrl.MessageBoardApp,
    },
    {
      id: 4,
      color: "#E94E77",
      upperColor: "#B33A59",
      handWriting: "Resume",
      href: RoutesUrl.Resume,
    },
    {
      id: 5,
      color: "#B8E986",
      upperColor: "#8FCA65",
      handWriting: "About",
      href: RoutesUrl.About,
    },
  ];

  //import global volume settings
  const { isMuted } = useVolume();

  const [floppyDisks, setFloppyDisks] = useState(initialDisks);
  const [lastRemovedDisk, setLastRemovedDisk] = useState(null);

  const InsertSound = new Audio("../public/sounds/insert.wav");

  const handleDiskClick = (diskId) => {
    const removedDisk = floppyDisks.find((disk) => disk.id === diskId);
    if (!isMuted) {
      InsertSound.currentTime = 0;
      InsertSound.play().catch((err) =>
        console.warn("Insert Sound error:", err)
      );
    }

    // Add the last removed disk back into the list if it exists
    if (lastRemovedDisk) {
      //remove the clicked disk, and add the old one
      setFloppyDisks(floppyDisks.filter((disk) => disk.id !== diskId));
      setFloppyDisks((prevDisks) => [...prevDisks, lastRemovedDisk]);
      setLastRemovedDisk(removedDisk);
    } else {
      // Remove the clicked disk
      setFloppyDisks(floppyDisks.filter((disk) => disk.id !== diskId));
      setLastRemovedDisk(removedDisk);
    }
  };

  return (
    <div className="cartridge-row">
      {floppyDisks.map((disk) => (
        <Link
          key={disk.id}
          className="floppy-container"
          onClick={() => handleDiskClick(disk.id)}
          to={disk.href}
        >
          <FloppyDisk
            key={disk.id}
            floppyDiskBackground={disk.color}
            upperFloppyDiskBackground={disk.upperColor}
            handWriting={disk.handWriting}
          />
        </Link>
      ))}
    </div>
  );
};

export default CartridgeRow;
