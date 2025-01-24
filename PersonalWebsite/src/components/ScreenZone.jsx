import { BrowserRouter, Routes, Route } from "react-router";
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
      <BrowserRouter>
        <Routes>
          <Route
            element={<BattleShipApp />}
            exact
            path={RoutesUrl.BattleShipApp}
          ></Route>
          <Route
            element={<StorePageApp />}
            exact
            path={RoutesUrl.StorePageApp}
          ></Route>
          <Route
            element={<MessageBoardApp />}
            exact
            path={RoutesUrl.MessageBoardApp}
          ></Route>
          <Route element={<Resume />} exact path={RoutesUrl.Resume}></Route>
          <Route element={<About />} exact path={RoutesUrl.About}></Route>
          <Route
            element={<IdleScreen />}
            exact
            path={RoutesUrl.IdleScreen}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default ScreenZone;
