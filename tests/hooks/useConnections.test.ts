import { renderHook, act } from '@testing-library/react';

import useConnections from '../../lib/hooks/useConnections';
import { EXAMPLE_BOARD_1 } from '../__data__/board';

describe('useConnections', () => {
  const onGameFinish: jest.MockedFunction<() => void> = jest.fn();
  const subject = () => { return renderHook(() => useConnections(EXAMPLE_BOARD_1, onGameFinish)) };

  describe('when pressing the shuffle button', () => {
    it('the board should be different', () => {
      const { result, rerender } = subject();
      const boardBefore = result.current.board;

      act(() => {
        result.current.shuffleBoard();
        rerender();
      });

      const boardAfter = result.current.board;
      expect(boardBefore.length).toBe(boardAfter.length);
      expect(boardBefore).not.toBe(boardAfter);
    });
  });

  describe('when selecting a square', () => {
    it('should be the only one marked selected', () => {
      const { result, rerender } = subject();
      act(() => {
        result.current.selectSquare(3);
        rerender();
      });

      const selectedSquares = result.current.board.filter((square) => square.selected) || [];
      expect(selectedSquares.length).toBe(1);
      expect(selectedSquares[0].id).toBe(3);
    });
  });

  describe('when selecting the same square twice', () => {
    it('should be marked to its original selection status', () => {
      const { result, rerender } = subject();
      const originalStatus = result.current.board[3].selected;
      act(() => {
        result.current.selectSquare(3);
        rerender();
        result.current.selectSquare(3);
        rerender();
      });
      const finalStatus = result.current.board[3].selected;

      expect(originalStatus).toBe(finalStatus);
    });
  });

  describe('when selecting more than four squares', () => {
    it('should result in only the first four selected', () => {
      const { result, rerender } = subject();
      [2,3,4,7,9,1,6].forEach((id) => {
        act(() => {
          result.current.selectSquare(id);
          rerender();
        });
      });

      const selectedSquares = result.current.board.filter((square) => square.selected) || [];
      expect(selectedSquares.length).toBe(4);

      const selectedIds = selectedSquares.map((x) => x.id ).sort();
      expect(selectedIds).toEqual([2,3,4,7]);

    });
  });

  describe('when pressing the deselect button after a square has been selected', () => {
    it('it should be different', () => {
      const { result, rerender } = subject();
      act(() => {
        result.current.selectSquare(2);
        rerender();
        result.current.deselect();
        rerender();
      });

    });
  });

  describe('when submitting four connected squares', () => {
    it('should add an entry to found', () => {
      const { result, rerender } = subject();
      [1,2,3,4].forEach((id) => {
        act(() => {
          result.current.selectSquare(id);
          rerender();
        });
      });

      act(() => {
        result.current.submitAnswer();
        rerender();
      });

      const numberOfGroupsFound = result.current.found.length;
      expect(numberOfGroupsFound).toBe(1);
    });
  });

  describe('when submitting four NON connected squares', () => {
    it('should not add to found and deselect everything', () => {
      const { result, rerender } = subject();
      [1,2,3,5].forEach((id) => {
        act(() => {
          result.current.selectSquare(id);
          rerender();
        });
      });

      act(() => {
        result.current.submitAnswer();
        rerender();
      });

      const numberOfGroupsFound = result.current.found.length;
      expect(numberOfGroupsFound).toBe(0);

      const selectedSquares = result.current.board.filter((square) => square.selected) || [];
      expect(selectedSquares.length).toBe(0);
    });
  });

  describe('when subnmitting fewer than four squares', () => {
    it('should result in three squares selected', () => {
      const { result, rerender } = subject();
      [2,3,4].forEach((id) => {
        act(() => {
          result.current.selectSquare(id);
          rerender();
        });
      });

      act(() => {
        result.current.submitAnswer();
        rerender();
      });

      const selectedSquares = result.current.board.filter((square) => square.selected) || [];
      expect(selectedSquares.length).toBe(3);
    });
  });

});

