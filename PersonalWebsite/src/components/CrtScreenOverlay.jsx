import PropTypes from "prop-types";
import CRTOutlineSVG from "../assets/SVG/CRTOutline.svg?react";
import ScreenZone from "./ScreenZone";
import "../css/CrtScreenOverlay.css";

const CrtScreenOverlay = ({ children }) => {
  return (
    <div className="crtWrapper">
      <div className="crtScreenOverlay">
        <CRTOutlineSVG></CRTOutlineSVG>
        <ScreenZone></ScreenZone>
      </div>
      {children}
    </div>
  );
};

// Prop validation
CrtScreenOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CrtScreenOverlay;
