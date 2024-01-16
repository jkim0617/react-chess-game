import Piece from "./Piece";

class Queen extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "queen"
  }
}

export default Queen