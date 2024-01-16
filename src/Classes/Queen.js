import Piece from "./Piece";

class Queen extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "queen"
    this.img = (side === "white" ? "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png")
  }
}

export default Queen