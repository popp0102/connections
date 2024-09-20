import './GameBoard.css';

export type FoundSquare = {
  category: string;
  words: string;
  mode: string;
}

export type BoardSquare = {
  id: number;
  word: string;
  selected: boolean;
  mode: string;
  category: string;
}

type GameBoardParams = {
  foundSquares: FoundSquare[];
  boardSquares: BoardSquare[];
  onSquareSelect: (id: number) => void;
};

export default function GameBoard({ foundSquares, boardSquares, onSquareSelect }: GameBoardParams) {
  return (
    <>
      {
        foundSquares.map((entry) => {
          const foundRowClasses = `connections-${entry.mode} connections-found-row`;
          return (
            <div key={entry.category} className={foundRowClasses}>
              <p className="connections-found-category">{entry.category}</p>
              <p>{entry.words}</p>
            </div>
          )
        })
      }
      {
        boardSquares.map((entry) => {
          let squareClasses = "connections-board-square";
          if (entry.selected) {
            squareClasses += " selected";
          }

          return (
            <button key={entry.id} onClick={() => onSquareSelect(entry.id)} className={squareClasses}>
                {entry.word}
            </button>
          );
        })
      }
    </>

  );
}
