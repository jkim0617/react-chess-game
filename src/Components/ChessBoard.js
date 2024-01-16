import BoardSquare from "./BoardSquare";
import { useEffect, useState } from "react";
import Pawn from "../Classes/Pawn";
import King from "../Classes/King";
import Rook from "../Classes/Rook";
import Bishop from "../Classes/Bishop";
import Queen from "../Classes/Queen";
import Knight from "../Classes/Knight"


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
      index === 0 ? "A"
        : index === 1 ? "B"
          : index === 2 ? "C"
            : index === 3 ? "D"
              : index === 4 ? "E"
                : index === 5 ? "F"
                  : index === 6 ? "G"
                    : "H"
    )
  }

  const boardDisplay = boardGenerator().map((row, index1) => {
    return row.map((item, index2) => {
      return <BoardSquare
        uniqueIndex={(index1 * 8) + index2}
        key={`Square-${index1}-${index2}`}
        index1={index1 + 1}
        index2={index2}
        index2Alpha={colToAlpha(index2)}
        piece={piece}
        setPiece={setPiece}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
      />
    })
  })

  // useEffect(() => {
  //   console.log(selectedPiece)
  // }, [selectedPiece])

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