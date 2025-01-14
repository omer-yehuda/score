'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { PlayerSetup } from '@/components/PlayerSetup';
import { ScoreTable } from '@/components/ScoreTable';
import { WinnerDialog } from '@/components/WinnerDialog';
import type { GameState } from '@/types/game';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const [showWinner, setShowWinner] = useState(false);

  const handleGameStart = (players: string[]) => {
    setGameState({
      isFinished: false,
      rounds: [],
      players: players.map(name => ({
        name,
        totalScore: 0,
        isWinning: false
      })),
      isLowScoreWins: true
    });
    setShowSetup(false);
  };

  const handleReset = () => {
    setGameState(null);
    setShowSetup(true);
    setShowWinner(false);
  };

  const handleEndGame = () => {
    if (gameState) {
      setShowWinner(true);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', p: 3 }}>
      {showSetup ? (
        <PlayerSetup onStart={handleGameStart} />
      ) : gameState ? (
        <>
          <ScoreTable 
            gameState={gameState}
            setGameState={setGameState}
            onEndGame={handleEndGame}
          />
          <WinnerDialog
            isOpen={showWinner}
            onClose={() => setShowWinner(false)}
            winner={gameState.players.find(p => p.isWinning)}
            onReset={handleReset}
          />
        </>
      ) : null}
    </Box>
  );
}