/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      import('../client/src/main');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900" id="game-container">
    </div>
  );
}
