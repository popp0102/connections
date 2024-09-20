import { type BoardSquare } from '@util/Grid';
import useConnections from '@hooks/useConnections';
import GameBoard from './GameBoard';
import './Connections.css';

type ConnectionsParams = {
  initialBoard: BoardSquare[];
  onGameFinish: () => void;
  colorConfig?: {
    category: { [ key: string]: string };
    square: { [ key: string]: string };
  };
};

const DEFAULT_COLOR_CONFIG: { 
  category: { [ key: string]: string };
  square: { [ key: string]: string };
} = {
  category: {
    easy: 'yellow',
    medium: 'teal',
    hard: 'blue',
    difficult: 'purple',
  },
  square: {
    text: 'green',
    background: 'white',
  }
};

export default function Connections({initialBoard, onGameFinish, colorConfig=DEFAULT_COLOR_CONFIG}: ConnectionsParams) {
  const connections = useConnections(initialBoard, onGameFinish);

  return (
    <div className="connections-container">
      <div className="connections-board">
        <GameBoard foundSquares={connections.found} boardSquares={connections.board} onSquareSelect={connections.selectSquare} colorConfig={colorConfig}/>
      </div>

      <div className="connections-extra-actions">
        <button onClick={connections.shuffleBoard}>Shuffle</button>
        <button onClick={connections.deselect}>Deselect All</button>
        <button disabled={!connections.isMaxSelected()} onClick={connections.submitAnswer}>Submit</button>
      </div>
    </div>
  );
}
