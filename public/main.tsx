import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Connections from '../lib/index';

export const board = [
  { id: 1,  word: 'north', selected: false, mode: 'easy',      category: 'directions' },
  { id: 2,  word: 'south', selected: false, mode: 'easy',      category: 'directions' },
  { id: 3,  word: 'east',  selected: false, mode: 'easy',      category: 'directions' },
  { id: 4,  word: 'west',  selected: false, mode: 'easy',      category: 'directions' },
  { id: 5,  word: 'red',   selected: false, mode: 'medium',    category: 'colors' },
  { id: 6,  word: 'blue',  selected: false, mode: 'medium',    category: 'colors' },
  { id: 7,  word: 'yellow',selected: false, mode: 'medium',    category: 'colors' },
  { id: 8,  word: 'green', selected: false, mode: 'medium',    category: 'colors' },
  { id: 9,  word: 'one',   selected: false, mode: 'hard',      category: 'numbers' },
  { id: 10, word: 'two',   selected: false, mode: 'hard',      category: 'numbers' },
  { id: 11, word: 'three', selected: false, mode: 'hard',      category: 'numbers' },
  { id: 12, word: 'four',  selected: false, mode: 'hard',      category: 'numbers' },
  { id: 13, word: 'oak',   selected: false, mode: 'difficult', category: 'types of wood' },
  { id: 14, word: 'pine',  selected: false, mode: 'difficult', category: 'types of wood' },
  { id: 15, word: 'maple', selected: false, mode: 'difficult', category: 'types of wood' },
  { id: 16, word: 'cedar', selected: false, mode: 'difficult', category: 'types of wood' }
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Connections initialBoard={board} onGameFinish={() => {alert('I won!')}}/>
  </StrictMode>,
)

