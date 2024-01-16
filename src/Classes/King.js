import Piece from "./Piece";

class King extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "king"
    this.img = (side === "white" ? "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png" : "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png")
  }
}

export default King