import { renderHook, act } from '@testing-library/react';

import useConnections from '../../lib/hooks/useConnections';
import { EXAMPLE_BOARD_1 } from '../__data__/board';

describe('useConnections', () => {
  const subject = () => { return renderHook(() => useConnections(EXAMPLE_BOARD_1)) };

  it('does not throw an error', () => {
    const { result } = subject();
    expect(result.current).toBeDefined();
  });

  describe('when pressing the shuffle button', () => {
    it('should be different', () => {
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
});

