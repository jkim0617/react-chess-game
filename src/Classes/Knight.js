import Piece from "./Piece";

class Knight extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "knight"
    this.img = (side === "white" ? "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png")
  }
}

export default Knight