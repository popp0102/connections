import { type BoardSquare } from '@util/Grid';
import useConnections from '@hooks/useConnections';
import GameBoard from './GameBoard';

type ConnectionsParams = {
  initialBoard: BoardSquare[];
  onGameFinish: () => void;
};

export default function Connections({initialBoard, onGameFinish}: ConnectionsParams) {
  const connections = useConnections(initialBoard, onGameFinish);

  return (
    <div className="connections-container">
      <div className="connections-board">
        <GameBoard foundSquares={connections.found} boardSquares={connections.board} onSquareSelect={connections.selectSquare}/>
      </div>

      <div className="connections-extra-actions">
        <button onClick={connections.shuffleBoard}>Shuffle</button>
        <button onClick={connections.deselect}>Deselect All</button>
        <button disabled={!connections.isMaxSelected()} onClick={connections.submitAnswer}>Submit</button>
      </div>
    </div>
  );
}
