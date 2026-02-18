'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PlayerSetup } from './components/PlayerSetup';
import { ScoreTable } from './components/ScoreTable';
import { WinnerDialog } from './components/WinnerDialog';
import type { GameState } from './types/game';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const [showWinner, setShowWinner] = useState(false);

  const handleGameStart = (players: string[], isLowScoreWins: boolean) => {
    setGameState({
      isFinished: false,
      rounds: [],
      players: players.map((name) => ({
        name,
        totalScore: 0,
        isWinning: false,
      })),
      isLowScoreWins,
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

  const winners = gameState?.players.filter((p) => p.isWinning) ?? [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        sx={{
          color: '#fff',
          mb: 3,
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        Score Tracker
      </Typography>

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
            winners={winners}
            onReset={handleReset}
          />
        </>
      ) : null}
    </Box>
  );
}
