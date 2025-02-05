import PropTypes from "prop-types";
import CRTOutlineSVG from "../assets/SVG/CRTOutline.svg?react";
import ScreenZone from "./ScreenZone";
import "../css/CrtScreenOverlay.css";

const CrtScreenOverlay = ({ children }) => {
  return (
    <div className="crtWrapper">
      <div className="crtScreenOverlay">
        <ScreenZone />
        <CRTOutlineSVG></CRTOutlineSVG>
      </div>
      {children}
    </div>
  );
};

// Prop validation
CrtScreenOverlay.propTypes = {
  children: PropTypes.node,
};

export default CrtScreenOverlay;
