import Piece from "./Piece";

class Rook extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "rook"
  }
}

export default Rook