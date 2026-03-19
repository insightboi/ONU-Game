/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { startGame } from '../client/src/main';

export default function App() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;
    
    const game = startGame(gameRef.current);
    
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div ref={gameRef} id="game-container" className="shadow-2xl rounded-lg overflow-hidden" />
    </div>
  );
}
