import Piece from "./Piece";

class Bishop extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "bishop";
    this.img = (side === "white" ? "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png" : "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png")
  }
}

export default Bishop
