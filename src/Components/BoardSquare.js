import PieceMove from "../Utilities/PieceMove";

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
  const isWhitePiece = piece.filter((currPiece) => {
    return (currPiece.side === "white")
  }).map((currPiece) => {
    return currPiece.index
  }).includes(uniqueIndex)
  const isBlackPiece = piece.filter((currPiece) => {
    return (currPiece.side === "black")
  }).map((currPiece) => {
    return currPiece.index
  }).includes(uniqueIndex)
  return (
    (isPiece ? "isPiece "
      : "not-piece") +
    (isSelectedPiece ? "isSelectedPiece " : "") +
    (isWhitePiece ? "white-piece "
      : isBlackPiece ? "black-piece "
        : "")
  )
}

function isValidSquare(currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece) {

  return (
    currPiece.type === "pawn" ? PieceMove.pawnMovement(currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece)
      : currPiece.type === "king" ? PieceMove.kingMovement(currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece)
        : currPiece.type === "rook" ? PieceMove.rookMovement(currPiece, nextPOS, piece, pieceIndexArray)
          : currPiece.type === "bishop" ? PieceMove.bishopMovement(currPiece, nextPOS, piece, pieceIndexArray)
            : currPiece.type === "queen" ? PieceMove.queenMovement(currPiece, nextPOS, piece, pieceIndexArray)
              : ""
  )
}

const BoardSquare = ({ uniqueIndex, index1, index2, index2Alpha, piece, setPiece, selectedPiece, setSelectedPiece, playerTurn, setPlayerTurn }) => {
  const pieceIndexArray = piece.map((currPiece) => { return currPiece.index });

  const pieceName = piece.filter((curr) => {
    return (curr.index === uniqueIndex)
  }).map((curr) => {
    return curr.type
  })[0]

  return (
    <div
      className={genSquareClass(index1, index2, uniqueIndex, piece, selectedPiece)}
      onClick={() => {
        // moving selected piece
        if (selectedPiece[0] !== -1) { // checks if there is a selected piece
          if (selectedPiece[0].index === uniqueIndex) { // unselecting a piece
            setSelectedPiece([-1])
          } else { // moving piece to new uniqueIndex
            if (isValidSquare(selectedPiece[0], uniqueIndex, pieceIndexArray, setSelectedPiece, piece, setPiece)) {
              // console.log("valid move")
              let movingPiece = selectedPiece[0]; // creating copy of selected piece
              movingPiece.index = uniqueIndex; // updating copy's index
              let pieceCopy = [...piece]; // copying piece array
              pieceCopy = pieceCopy.filter((curr) => { // filtering out the old selected piece
                return (curr !== selectedPiece[0])
              })
              pieceCopy = pieceCopy.filter((curr) => { // removing any pieces that might be in the new location
                return (curr.index !== uniqueIndex)
              })
              setPiece([...pieceCopy, movingPiece])
              setSelectedPiece([-1])
              setPlayerTurn(playerTurn === "white" ? "black" : "white")
            }
          }
        }
        // selecting a piece
        else if (pieceIndexArray.includes(uniqueIndex)) {
          let selected = piece.filter((option) => {
            return (option.index === uniqueIndex)
          })
          if (selected[0].side === playerTurn)
            setSelectedPiece(selected)
        }

      }}
    >
      {/* <p>{`${index1},${index2Alpha}`}</p> */}
      <p className="unique-index">{uniqueIndex}</p>
      <div className={genPieceClass(uniqueIndex, piece, selectedPiece)}>
        {/* {pieceName} */}
      </div>

    </div>
  )
}

export default BoardSquare