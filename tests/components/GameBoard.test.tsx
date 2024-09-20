import { render } from '@testing-library/react';

import { EXAMPLE_BOARD_1 } from '../__data__/board';
import { type FoundSquare } from '../../lib/util/Grid';
import GameBoard from '../../lib/components/GameBoard';

describe('GameBoard Component', () => {
  const handleSquareSelect = (_: number) => {};
  const foundSquares: FoundSquare[] = [];
  const boardSquares = EXAMPLE_BOARD_1;
  const colorConfig = {
    category: {
      easy: 'yellow',
      medium: 'teal',
      hard: 'blue',
      difficult: 'purple',
    },
    square: {
      text: 'teal', 
      background: 'cobalt',
    }
  };

  const subject = () => { render(<GameBoard foundSquares={foundSquares} boardSquares={boardSquares} onSquareSelect={handleSquareSelect} colorConfig={colorConfig}/>, {}) };

  it('does not throw an error', () => {
    expect(subject).not.toThrow();
  });
});



