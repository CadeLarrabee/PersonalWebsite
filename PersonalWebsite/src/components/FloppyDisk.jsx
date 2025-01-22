import FloppyDiskSvg from "../assets/SVG/floppyDisk.svg?react";
import HandWriting from "./HandWriting";
import PropTypes from "prop-types";

const FloppyDisk = ({ floppyDiskBackground, handWriting }) => (
  <>
    <FloppyDiskSvg
      className="floppy"
      style={{
        fill: floppyDiskBackground,
      }}
    />
    <HandWriting noteId={handWriting} />
  </>
);

export default FloppyDisk;

FloppyDisk.propTypes = {
  floppyDiskBackground: PropTypes.string.isRequired,
  handWriting: PropTypes.string.isRequired,
};
