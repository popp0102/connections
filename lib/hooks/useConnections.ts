import { useState } from 'react';

import { type FoundSquare, type BoardSquare } from '@util/Grid'

const SHUFFLE_FUNCTION = () => Math.random() - 0.5;

export default function useConnections(initialBoard: BoardSquare[]) {
  const [board, setBoard] = useState(initialBoard.sort(SHUFFLE_FUNCTION));
  const [found, setFound] = useState([]);

  function handleShuffleBoard() {
    setBoard((prevBoard) => {
      let newBoard = [...prevBoard];
      return newBoard.sort(SHUFFLE_FUNCTION);
    });
  }

  function handleDeselect() {
    setBoard((prevBoard) => {
      return prevBoard.map((square) => ( { ...square, selected: false } ));
    });
  }

  function handleSquareSelect(square_id: number) {
    const currentEntry    = board.find((square) => square.id === square_id);
    const selectedEntries = board.filter((square) => square.selected) || [];

    if (selectedEntries.length >= 4 && !currentEntry!.selected) {
      return;
    }

    setBoard((prevBoard) => {
      return prevBoard.map((square) => {
        return (square.id === square_id) ? { ...square, selected: !square.selected } : square;
      });
    });
  }
  return {
    board: board,
    found: found,
    deselect: handleDeselect,
    selectSquare: handleSquareSelect,
    shuffleBoard: handleShuffleBoard,
  };
}

