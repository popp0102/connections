import { type FoundSquare, type BoardSquare } from '@util/Grid'
import './GameBoard.css';

type GameBoardParams = {
  foundSquares: FoundSquare[];
  boardSquares: BoardSquare[];
  onSquareSelect: (id: number) => void;
};

export default function GameBoard({ foundSquares, boardSquares, onSquareSelect }: GameBoardParams) {
  return (
    <>
      {
        foundSquares.map((square) => {
          const foundRowClasses = `connections-${square.mode} connections-found-row`;
          return (
            <div key={square.category} className={foundRowClasses}>
              <p className="connections-found-category">{square.category}</p>
              <p>{square.words}</p>
            </div>
          )
        })
      }
      {
        boardSquares.map((square) => {
          let squareClasses = "connections-board-square";
          if (square.selected) {
            squareClasses += " selected";
          }

          return (
            <button key={square.id} onClick={() => onSquareSelect(square.id)} className={squareClasses}>
                {square.word}
            </button>
          );
        })
      }
    </>
  );
}

