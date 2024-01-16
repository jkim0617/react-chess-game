import Piece from "./Piece";

class King extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "king"
  }
}

export default King