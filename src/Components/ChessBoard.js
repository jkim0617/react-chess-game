import BoardSquare from "./BoardSquare";
import { useEffect, useState } from "react";
import Pawn from "../Classes/Pawn";
import King from "../Classes/King";
import Rook from "../Classes/Rook";
import Bishop from "../Classes/Bishop";
import Queen from "../Classes/Queen";
import Knight from "../Classes/Knight"
import Movement from "../Utilities/Movement"
import PieceMove from "../Utilities/PieceMove";


const ChessBoard = () => {
  const [piece, setPiece] = useState(pieceSpawn())
  const [selectedPiece, setSelectedPiece] = useState([-1])
  const [playerTurn, setPlayerTurn] = useState("white")

  // Board Creation

  // Piece Creation

  function pawnSpawn() {
    let final = [];
    for (let i = 8; i < 16; i++) {
      final.push(new Pawn(i, "black"));
      final.push(new Pawn(i + 40, "white"))
    }
    // console.log(final)
    return final;
  }

  function pieceSpawn() {
    let final = [];
    final = [...pawnSpawn(), new King(4, "black"), new King(60, "white")]; // spawn kings
    final = [...final, new Rook(0, "black"), new Rook(7, "black"), new Rook(56, "white"), new Rook(63, "white")]; // spawn rooks
    final = [...final, new Bishop(2, "black"), new Bishop(5, "black"), new Bishop(58, "white"), new Bishop(61, "white"),]; // bishop
    final = [...final, new Queen(3, "black"), new Queen(59, "white")]; // spawn queen
    final = [...final, new Knight(1, "black"), new Knight(6, "black"), new Knight(57, "white"), new Knight(62, "white")]
    return final;
  }

  const boardGenerator = () => {
    let board = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row[j] = 0;
      }
      board.push(row)
    }
    return board
  }

  const colToAlpha = (index) => {
    return (
      index === 0 ? "a"
        : index === 1 ? "b"
          : index === 2 ? "c"
            : index === 3 ? "d"
              : index === 4 ? "e"
                : index === 5 ? "f"
                  : index === 6 ? "g"
                    : "h"
    )
  }

  function moveTracker(prevIndex, nextIndex) {
    prevIndex = prevIndex[0].index;
    return (`${8 - Math.floor(prevIndex / 8)}${colToAlpha(prevIndex % 8)} to ${8 - Math.floor(nextIndex / 8)}${colToAlpha(nextIndex % 8)}`)
  }

  function movePiece(uniqueIndex, pieceIndexArray) {
    if (selectedPiece[0] !== -1) { // checks if there is a selected piece
      if (selectedPiece[0].index === uniqueIndex) { // unselecting a piece
        setSelectedPiece([-1])
      } else { // moving piece to new uniqueIndex
        if (isValidSquare(selectedPiece[0], uniqueIndex, pieceIndexArray, setSelectedPiece, piece, setPiece)) {


          // console.log(moveTracker(selectedPiece, uniqueIndex))


          let movingPiece = selectedPiece[0]; // creating copy of selected piece
          movingPiece.index = uniqueIndex; // updating copy's index
          let pieceCopy = [...piece]; // copying piece array
          pieceCopy = pieceCopy.filter((curr) => { // filtering out the old selected piece
            return (curr !== selectedPiece[0])
          })
          pieceCopy = pieceCopy.filter((curr) => { // removing any pieces that might be in the new location
            return (curr.index !== uniqueIndex)
          })


          setPiece([...pieceCopy, movingPiece]) // update pieces
          setSelectedPiece([-1]) // remove selected piece
          setPlayerTurn(playerTurn === "white" ? "black" : "white") // switch player turn

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
  }

  function isValidSquare(currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece) {
    return (
      currPiece.type === "pawn" ? PieceMove.pawnMovement(currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece)
        : currPiece.type === "king" ? PieceMove.kingMovement(currPiece, nextPOS, pieceIndexArray, setSelectedPiece, piece)
          : currPiece.type === "rook" ? PieceMove.rookMovement(currPiece, nextPOS, piece, pieceIndexArray)
            : currPiece.type === "bishop" ? PieceMove.bishopMovement(currPiece, nextPOS, piece, pieceIndexArray)
              : currPiece.type === "queen" ? PieceMove.queenMovement(currPiece, nextPOS, piece, pieceIndexArray)
                : currPiece.type === "knight" ? PieceMove.knightMovement(currPiece, nextPOS, piece, pieceIndexArray)
                  : ""
    )
  }

  const boardDisplay = boardGenerator().map((row, index1) => {
    return row.map((item, index2) => {
      return <BoardSquare
        uniqueIndex={(index1 * 8) + index2}
        key={`Square-${index1}-${index2}`}
        index1={8 - index1}
        index2={index2}
        movePiece={movePiece} // function
        piece={piece} // state
        selectedPiece={selectedPiece} // state
      />
    })
  })

  useEffect(() => {
    console.log(selectedPiece)
  }, [selectedPiece])


  return (
    <div className="game-display-container">
      <div className="chess-board-container">
        {boardDisplay}
      </div>
      <div className="move-display-container">

      </div>
    </div>
  )
}

export default ChessBoard