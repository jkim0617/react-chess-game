import Piece from "./Piece";

class Bishop extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "bishop"
  }
}

export default Bishop