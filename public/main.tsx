import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Connections from '../lib/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Connections />
  </StrictMode>,
)

