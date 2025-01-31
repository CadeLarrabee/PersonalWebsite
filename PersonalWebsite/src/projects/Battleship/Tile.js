class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isHit = false;
    this.Ship = null;
  }
  setShip(ship) {
    this.Ship = ship;
  }
  getShip() {
    return this.Ship;
  }
  setHit(bool) {
    this.isHit = bool;
  }
  getHit() {
    return this.isHit;
  }
}
export default Tile;
