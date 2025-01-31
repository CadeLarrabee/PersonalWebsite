class GameState {
  //
  // Game state manager
  //
  //possible states:
  //
  //0 - player one setup
  //1 - player two setup
  //2 - player ones turn
  //3 - player twos turn
  //
  constructor(state, currentPlayer) {
    this.state = state ?? 0;
  }
  setState(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
  advanceState() {
    this.state += 1;
    if (this.state > 3) this.state = 2;
    return this.state;
  }
}

export default GameState;
