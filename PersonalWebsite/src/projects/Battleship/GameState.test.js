import GameState from "./GameState.js";

describe("GameState functions", () => {
  let gameState;

  beforeEach(() => {
    gameState = new GameState();
  });
  test("expect game state to be 3", () => {
    gameState.setState(3);
    expect(gameState.getState()).toEqual(3);
  });
  test("expect game state to be 3", () => {
    gameState.advanceState();
    gameState.advanceState();
    gameState.advanceState();
    gameState.advanceState();
    gameState.advanceState();
    expect(gameState.getState()).toEqual(3);
  });
});
