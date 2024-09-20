import { type FoundSquare, type BoardSquare } from '@util/Grid'
import './GameBoard.css';

type GameBoardParams = {
  foundSquares: FoundSquare[];
  boardSquares: BoardSquare[];
  onSquareSelect: (id: number) => void;
  colorConfig: {
    category: { [ key: string]: string };
    square: { [ key: string]: string };
  };
};

export default function GameBoard({ foundSquares, boardSquares, onSquareSelect, colorConfig }: GameBoardParams) {
  return (
    <>
      {
        foundSquares.map((square) => {
          const foundRowClasses = `connections-${square.mode} connections-found-row`;
          const color = colorConfig['category'][square.mode];
          return (
            <div key={square.category} className='connections-found-row' style={{ backgroundColor: color }} >
              <p className="connections-found-category">{square.category}</p>
              <p>{square.words}</p>
            </div>
          )
        })
      }
      {
        boardSquares.map((square) => {
          const backgroundColor = colorConfig['square']['background'];
          const textColor       = colorConfig['square']['text'];
          let styles = { color: textColor, backgroundColor: backgroundColor };

          if (square.selected) {
            styles = { color: backgroundColor, backgroundColor: textColor };
          }

          return (
            <button key={square.id} onClick={() => onSquareSelect(square.id)} className='connections-board-square' style={styles}>
                {square.word}
            </button>
          );
        })
      }
    </>
  );
}

