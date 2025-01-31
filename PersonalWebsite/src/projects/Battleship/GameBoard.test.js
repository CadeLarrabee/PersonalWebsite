import gameBoard from "./GameBoard.js";
import Tile from "./Tile.js";
import Ship from "./Ship.js";

describe("Gameboard functions", () => {
  let testBoard;

  beforeEach(() => {
    testBoard = new gameBoard();
  });

  test("expect game board to be 100 cells", () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr[i] = [];
      for (let j = 0; j < 10; j++) {
        arr[i][j] = new Tile(i, j);
      }
    }
    expect(testBoard.board).toEqual(arr);
  });

  test("expect a created ship to exist, and remove ship to remove", () => {
    const ship = testBoard.addShipToBoard("Cruiser", 3, [
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
    expect(testBoard.board[0][1].getShip()).toEqual(ship);
    expect(testBoard.board[0][2].getShip()).toEqual(ship);
    expect(testBoard.board[0][3].getShip()).toEqual(ship);
    testBoard.removeShipFromBoard(ship);
    expect(testBoard.board[0][1].getShip()).toEqual(null);
    expect(testBoard.board[0][2].getShip()).toEqual(null);
    expect(testBoard.board[0][3].getShip()).toEqual(null);
    expect(testBoard.ships).not.toContain(ship);
  });

  test("receive attack", () => {
    const ship = new Ship("Destroyer", 2, [
      [0, 1],
      [0, 2],
    ]);
    testBoard.board[0][1].setShip(ship);
    testBoard.board[0][2].setShip(ship);
    testBoard.receiveAttack([0, 1]);
    expect(ship.hits).toEqual(1);
    expect(testBoard.Shots).toContainEqual([0, 1]);
  });

  test("add ship out of bounds should throw an error", () => {
    expect(() => {
      testBoard.addShipToBoard("Carrier", 5, [
        [9, 7],
        [9, 8],
        [9, 9],
        [9, 10], // Out of bounds
        [9, 11], // Out of bounds
      ]);
    }).toThrow("Error: Coordinate out of board bounds");
  });

  test("add ship on already occupied tile should throw an error", () => {
    testBoard.addShipToBoard("Destroyer", 2, [
      [0, 1],
      [0, 2],
    ]);
    expect(() => {
      testBoard.addShipToBoard("Submarine", 3, [
        [0, 1],
        [0, 2],
        [0, 3],
      ]);
    }).toThrow("Error: Another ship is already placed at this coordinate");
  });

  test("all ships sunk", () => {
    const ship1 = testBoard.addShipToBoard("Destroyer", 2, [
      [0, 1],
      [0, 2],
    ]);
    const ship2 = testBoard.addShipToBoard("Cruiser", 3, [
      [1, 1],
      [1, 2],
      [1, 3],
    ]);
    expect(testBoard.allShipsSunk()).toBe(false);
    testBoard.removeShipFromBoard(ship1);
    expect(testBoard.allShipsSunk()).toBe(false);
    testBoard.removeShipFromBoard(ship2);
    expect(testBoard.allShipsSunk()).toBe(true);
  });

  test("receive attack and sink ship", () => {
    const ship = testBoard.addShipToBoard("Destroyer", 2, [
      [0, 1],
      [0, 2],
    ]);
    testBoard.receiveAttack([0, 1]);
    testBoard.receiveAttack([0, 2]);
    expect(ship.isSunk()).toBe(true);
    expect(testBoard.ships).not.toContain(ship);
  });
});
