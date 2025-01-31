import PropTypes from "prop-types";
import Note1 from "../assets/SVG/battleShipHandArt.svg?react";
import Note2 from "../assets/SVG/storePageAppHandArt.svg?react";
import Note3 from "../assets/SVG/messageBoardHandArt.svg?react";
import Note4 from "../assets/SVG/resumeHandArt.svg?react";
import Note5 from "../assets/SVG/aboutHandArt.svg?react";

const HandWriting = ({ noteId }) => {
  const notes = {
    BattleShipApp: <Note1 className="handWritingSvg" />,
    StorePageApp: <Note2 className="handWritingSvg" />,
    MessageBoardApp: <Note3 className="handWritingSvg" />,
    Resume: <Note4 className="handWritingSvg" />,
    About: <Note5 className="handWritingSvg" />,
  };

  return notes[noteId] || null;
};

HandWriting.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default HandWriting;
