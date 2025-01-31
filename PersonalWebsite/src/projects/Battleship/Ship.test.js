import Ship from "./Ship.js";

describe("Ship functions", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(null, 3, [
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
  });

  test("Expect ship length to be 3", () => {
    expect(ship.getLength()).toBe(3);
  });

  test("Expect Ship sunk to be true", () => {
    ship.addHit();
    ship.addHit();
    ship.addHit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Expect ship hits to be 2", () => {
    ship.addHit();
    ship.addHit();
    expect(ship.getHits()).toBe(2);
  });
});
