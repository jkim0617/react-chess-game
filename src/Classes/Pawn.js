import Piece from "./Piece";

class Pawn extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "pawn";
    this.canPush = true;
  }
}

export default Pawn;