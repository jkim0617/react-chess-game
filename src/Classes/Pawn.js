import Piece from "./Piece";
import PieceMove from "../Utilities/PieceMove";

class Pawn extends Piece {
  constructor(index, side) {
    super(index, side);
    this.type = "pawn";
    this.canPush = true;
    this.img = (side === "white" ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png" : "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png")
  }
}

export default Pawn;