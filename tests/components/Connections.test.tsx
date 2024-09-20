import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Connections from '../../lib/components/Connections';
import { EXAMPLE_BOARD_1 } from '../__data__/board';

describe('Connections Component', () => {
  const handleGameFinish: jest.MockedFunction<() => void> = jest.fn();
  const subject = () => { render(<Connections initialBoard={EXAMPLE_BOARD_1} onGameFinish={handleGameFinish}/>, {}) };

  it('does not throw an error', () => {
    expect(subject).not.toThrow();
  });

  describe('player wins', () => {

    it('by pushing keys from a real keyboard', async () => {
      subject();
      [
        ['north', 'south', 'east', 'west'],
        ['red', 'blue', 'yellow', 'green'],
        ['one', 'two', 'three', 'four'],
        ['oak', 'pine', 'maple', 'cedar']
      ].forEach((guesses) => {
        guesses.forEach((guess) => {
          const squareButton = screen.getByRole('button', { name: guess });
          userEvent.click(squareButton);
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        userEvent.click(submitButton);
      });

      expect(subject).not.toThrow();

      await waitFor(() => {
        expect(handleGameFinish).toHaveBeenCalled();
      });
    });
  });
});

