import Piece from "./Piece";

class Rook extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "rook"
    this.img = (side === "white" ? "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png")
  }
}

export default Rook