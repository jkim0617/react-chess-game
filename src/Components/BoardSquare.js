import PieceMove from "../Utilities/PieceMove";
import Movement from "../Utilities/Movement";
import { useEffect } from "react";

function genSquareClass(id1, id2) {
  return (
    "chess-square " +
    ((id1 + id2) % 2 === 0 ? "white-square " : "black-square ")
  )
}

function genPieceClass(uniqueIndex, piece, selectedPiece) {
  const pieceIndexArray = piece.map((currPiece) => { return currPiece.index });
  const selectedIndexArray = selectedPiece.map((currPiece) => { return currPiece.index })
  const isPiece = pieceIndexArray.includes(uniqueIndex);
  const isSelectedPiece = selectedIndexArray.includes(uniqueIndex);
  return (
    (isPiece ? "isPiece "
      : "not-piece") +
    (isSelectedPiece ? "isSelectedPiece " : "")
  )
}

const isCheck = (turn, piece, pieceIndexArray) => {
  let kingPos = piece.filter((currPiece) => {
    return (currPiece.type === "king" && currPiece.side === turn)
  })[0]
  let enemyPieces = piece.filter((currPiece) => {
    return (currPiece.side !== turn && (currPiece.type === "rook" || currPiece.type === "bishop" || currPiece.type === "queen"))
  })
  for (let i = 0; i < enemyPieces.length; i++) {
    if (enemyPieces[i].type === "bishop") {
      // console.log("bishop position", i)
      if (Movement.goSkrrt(kingPos, enemyPieces[i].index, pieceIndexArray, 7)) {
        console.log("check")
        return true;
      } else if (Movement.goSkrrt(kingPos, enemyPieces[i].index, pieceIndexArray, 9)) {
        console.log("check")
        return true;
      }
    }
  }
  return false;
  // console.log(kingPos)
  // console.log(enemyPieces)
}



const BoardSquare = ({ uniqueIndex, index1, index2, movePiece, piece, selectedPiece }) => {
  const pieceIndexArray = piece.map((currPiece) => { return currPiece.index });

  const pieceImg = piece.filter((curr) => {
    return (curr.index === uniqueIndex)
  }).map((curr) => {
    return curr.img
  })[0]

  return (
    <div
      className={genSquareClass(index1, index2)}
      onClick={() => {
        movePiece(uniqueIndex, pieceIndexArray)
      }}
    >
      {/* <p>{`${index1},${index2}`}</p> */}
      {/* <p className="unique-index">{uniqueIndex}</p> */}
      <div className={genPieceClass(uniqueIndex, piece, selectedPiece)}>
        <img src={pieceImg} className="piece-image"></img>
      </div>
    </div>
  )
}

export default BoardSquare