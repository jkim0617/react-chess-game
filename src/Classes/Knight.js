import Piece from "./Piece";

class Knight extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "knight"
  }
}

export default Knight