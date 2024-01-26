import Movement from "./Movement";

const checkIfEnemy = Movement.checkIfEnemy
const checkIfFriendly = Movement.checkIfFriendly
const goSkrrt = Movement.goSkrrt
const ankleBreak = Movement.ankleBreak

const PieceMove = {
  pawnMovement: function (currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece) {
    let multiplier;
    let oppositeSide;

    // check if white or black
    currPiece.side === "white" ? multiplier = 1 : multiplier = -1;

    if (currPiece.side === "white") {
      multiplier = 1;
      oppositeSide = "black"
    } else {
      multiplier = -1;
      oppositeSide = "white"
    }

    // attacking
    if (checkIfEnemy(oppositeSide, nextPOS, piece)) {
      if (currPiece.index - nextPOS === (9 * multiplier) || currPiece.index - nextPOS === (7 * multiplier)) {
        return true
      }
    }

    // not attacking
    // push
    if (!pieceIndexArray.includes(nextPOS)) {
      if (currPiece.canPush && (currPiece.index - (16 * multiplier) === nextPOS)) {
        currPiece.canPush = false;
        return (
          true
        )
      }
      // normal move
      else {
        currPiece.canPush = false;
        return (
          (currPiece.index - (8 * multiplier) === nextPOS) ? true : false
        )
      }
    } else {
      console.log("pawn block")
      setSelectedPiece([-1])
    }
  },
  kingMovement: function (currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece) {
    if (!checkIfFriendly(currPiece.side, nextPOS, piece)) {
      return (
        currPiece.index + 8 === nextPOS ? true
          : currPiece.index - 8 === nextPOS ? true
            : currPiece.index + 1 === nextPOS ? true
              : currPiece.index - 1 === nextPOS ? true
                : currPiece.index + 9 === nextPOS ? true
                  : currPiece.index - 9 === nextPOS ? true
                    : currPiece.index + 7 === nextPOS ? true
                      : currPiece.index - 7 === nextPOS ? true
                        : false
      )
    }

  },
  rookMovement: function (currPiece, nextPOS, piece, pieceIndexArray) {
    if (!checkIfFriendly(currPiece.side, nextPOS, piece)) {
      if ((currPiece.index - nextPOS) % 8 === 0) {
        return goSkrrt(currPiece, nextPOS, pieceIndexArray, 8);
      }
      if (Math.floor(currPiece.index / 8) === Math.floor(nextPOS / 8)) {
        return ankleBreak(currPiece, nextPOS, pieceIndexArray)
      }
    }
  },
  bishopMovement: function (currPiece, nextPOS, piece, pieceIndexArray) {
    if (!checkIfFriendly(currPiece.side, nextPOS, piece)) {
      if ((currPiece.index - nextPOS) % 9 === 0) {
        return goSkrrt(currPiece, nextPOS, pieceIndexArray, 9);
      }
      if ((currPiece.index - nextPOS) % 7 === 0) {
        return goSkrrt(currPiece, nextPOS, pieceIndexArray, 7);
      }
    }
  },
  queenMovement: function (currPiece, nextPOS, piece, pieceIndexArray) {
    if (!checkIfFriendly(currPiece.side, nextPOS, piece)) {
      if ((currPiece.index - nextPOS) % 9 === 0) {
        return goSkrrt(currPiece, nextPOS, pieceIndexArray, 9);
      }
      if ((currPiece.index - nextPOS) % 7 === 0) {
        return goSkrrt(currPiece, nextPOS, pieceIndexArray, 7);
      }
      if ((currPiece.index - nextPOS) % 8 === 0) {
        return goSkrrt(currPiece, nextPOS, pieceIndexArray, 8);
      }
      if (Math.floor(currPiece.index / 8) === Math.floor(nextPOS / 8)) {
        return ankleBreak(currPiece, nextPOS, pieceIndexArray)
      }
    }
  },
  knightMovement: function (currPiece, nextPOS, piece, pieceIndexArray) {
    let index1 = Math.floor(currPiece.index / 8);
    let index2 = currPiece.index % 8;
    let nextPos1 = Math.floor(nextPOS / 8);
    let nextPos2 = nextPOS % 8;
    if (Math.abs(index1 - nextPos1) === 2 && Math.abs(index2 - nextPos2) === 1) {
      return true;
    } else if (Math.abs(index1 - nextPos1) === 1 && Math.abs(index2 - nextPos2) === 2) {
      return true;
    }
  }
}

export default PieceMove