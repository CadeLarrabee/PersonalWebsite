import PropTypes from "prop-types";
import Note1 from "../assets/SVG/battleShipHandArt.svg?react";
import Note2 from "../assets/SVG/storePageAppHandArt.svg?react";
import Note3 from "../assets/SVG/messageBoardHandArt.svg?react";
import Note4 from "../assets/SVG/resumeHandArt.svg?react";
import Note5 from "../assets/SVG/aboutHandArt.svg?react";

const HandWriting = ({ noteId }) => {
  const notes = {
    note1: <Note1 className="handWritingSvg" />,
    note2: <Note2 className="handWritingSvg" />,
    note3: <Note3 className="handWritingSvg" />,
    note4: <Note4 className="handWritingSvg" />,
    note5: <Note5 className="handWritingSvg" />,
  };

  return notes[noteId] || null;
};

HandWriting.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default HandWriting;
