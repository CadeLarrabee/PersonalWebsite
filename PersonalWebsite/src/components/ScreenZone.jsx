import { Routes, Route } from "react-router-dom";
//previous projects
import BattleShipApp from "../projects/BattleshipApp";
import StorePageApp from "../projects/StorePageApp";
import MessageBoardApp from "../projects/MessageBoardApp";
//info
import Resume from "./Resume";
import About from "./About";
//idle
import IdleScreen from "./IdleScreen";
import "../css/ScreenZone.css";

export const RoutesUrl = {
  BattleShipApp: "/projects/BattleshipApp",
  StorePageApp: "/projects/StorePageApp",
  MessageBoardApp: "/projects/MessageBoardApp",
  Resume: "/Resume",
  About: "/About",
  IdleScreen: "/",
};

const ScreenZone = () => {
  return (
    <div className="screen-zone">
      <Routes>
        <Route element={<BattleShipApp />} path={RoutesUrl.BattleShipApp} />
        <Route element={<StorePageApp />} path={RoutesUrl.StorePageApp} />
        <Route element={<MessageBoardApp />} path={RoutesUrl.MessageBoardApp} />
        <Route element={<Resume />} path={RoutesUrl.Resume} />
        <Route element={<About />} path={RoutesUrl.About} />
        <Route element={<IdleScreen />} path={RoutesUrl.IdleScreen} />
        {/* //404 or fallback route */}
        <Route element={<IdleScreen />} path="*" />
      </Routes>
    </div>
  );
};

export default ScreenZone;
