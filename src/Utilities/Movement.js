const Movement = {
  checkIfEnemy: function (enemySide, nextPOS, piece) {
    if (piece.filter((curr) => {
      return curr.side === enemySide
    }).map((curr) => {
      return curr.index
    }).includes(nextPOS)) {
      return true;
    } else {
      return false;
    }
  },

  checkIfFriendly: function (friendlySide, nextPOS, piece) {
    if (piece.filter((curr) => {
      return curr.side === friendlySide
    }).map((curr) => {
      return curr.index
    }).includes(nextPOS)) {
      return true;
    } else {
      return false;
    }
  },

  // any vertical and diagonal movement
  goSkrrt: function (currPiece, nextPOS, pieceIndexArray, slutNum) {
    let smol = currPiece.index < nextPOS ? currPiece.index : nextPOS;
    let bige = currPiece.index > nextPOS ? currPiece.index : nextPOS;
    if ((currPiece.index - nextPOS) % slutNum === 0) {
      for (let i = smol + slutNum; i < bige; i += slutNum) {
        // console.log(i)
        if (pieceIndexArray.includes(i)) {
          // console.log("uwu oh no i fucky wucky")
          // console.log("the fuck up:", i)
          return false;
        }
      }
      return true;
    }
  },

  // horizontal movement
  ankleBreak: function (currPiece, nextPOS, pieceIndexArray) {
    let smol = currPiece.index < nextPOS ? currPiece.index : nextPOS;
    let bige = currPiece.index > nextPOS ? currPiece.index : nextPOS;
    for (let i = smol + 1; i < bige; i++) {
      // console.log(i);
      if (pieceIndexArray.includes(i)) {
        // console.log("uwu oh no i fucky wucky")
        // console.log("the fuck up:", i)
        return false;
      }
    }
    return true;
  }
}

export default Movement