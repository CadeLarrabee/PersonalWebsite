import gameBoard from "./GameBoard.js";

class Player {
  constructor(type, playerId) {
    this.type = type;
    this.playerId = playerId;
    this.gameBoard = new gameBoard();
    this.hasShot = null;
  }
}

export default Player;
