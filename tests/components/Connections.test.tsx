import { render } from '@testing-library/react';

import Connections from '../../lib/components/Connections';

describe('Connections Component', () => {
  const subject = () => { render(<Connections />, {}) };

  it('does not throw an error', () => {
    expect(subject).not.toThrow();
  });
});


