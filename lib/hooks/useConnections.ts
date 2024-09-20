import { useState } from 'react';

import { type FoundSquare, type BoardSquare } from '@util/Grid'

const SHUFFLE_FUNCTION = () => Math.random() - 0.5;

export default function useConnections(initialBoard: BoardSquare[], onGameFinish: () => void) {
  const [board, setBoard] = useState<BoardSquare[]>(initialBoard.sort(SHUFFLE_FUNCTION));
  const [found, setFound] = useState<FoundSquare[]>([]);

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
    const selectedSquares = board.filter((square) => square.selected) || [];

    if (selectedSquares.length >= 4 && !currentEntry!.selected) {
      return;
    }

    setBoard((prevBoard) => {
      return prevBoard.map((square) => {
        return (square.id === square_id) ? { ...square, selected: !square.selected } : square;
      });
    });
  }

  function handleSubmitAnswer() {
    const selectedSquares = board.filter((square) => square.selected) || [];

    if (selectedSquares.length < 4) {
      return;
    }

    const category     = selectedSquares[0].category;
    const mode         = selectedSquares[0].mode;
    const finalSquares = selectedSquares.filter((square) => square.category === category);
    const didWinRow    = finalSquares.length === 4;

    if(!didWinRow) {
      handleDeselect();
      return;
    }

    const words = finalSquares.map((square) => square.word).join(', ');
    setFound((prevFound) => {
      return [...prevFound, { category: category, words: words, mode: mode }];
    });

    setBoard((prevBoard) => {
      return [...prevBoard].filter((square) => square.category !== category);
    });

    if (board.length <= 4) {
      onGameFinish();
    }
  }

  function isMaxSelected() {
    const selectedSquares = board.filter((square) => square.selected) || [];
    return (selectedSquares.length >=4);
  }

  return {
    board: board,
    found: found,
    deselect: handleDeselect,
    isMaxSelected: isMaxSelected,
    selectSquare: handleSquareSelect,
    shuffleBoard: handleShuffleBoard,
    submitAnswer: handleSubmitAnswer,
  };
}

