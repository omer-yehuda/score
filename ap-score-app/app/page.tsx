'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PlayerSetup } from './components/PlayerSetup';
import { ScoreTable } from './components/ScoreTable';
import { WinnerDialog } from './components/WinnerDialog';
import { computeGameState } from './lib/gameLogic';
import type { GameState } from './types/game';

const STORAGE_KEY = 'score-tracker-state';

const loadSavedState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as GameState) : null;
  } catch {
    return null;
  }
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(loadSavedState);
  const [showSetup, setShowSetup] = useState(!loadSavedState());
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    if (gameState) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      } catch {
        // Silently fail on quota exceeded
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [gameState]);

  const handleGameStart = useCallback(
    (players: string[], isLowScoreWins: boolean) => {
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
    },
    [],
  );

  const handleReset = useCallback(() => {
    setGameState(null);
    setShowSetup(true);
    setShowWinner(false);
  }, []);

  const handleEndGame = useCallback(() => {
    setShowWinner(true);
  }, []);

  const handleAddRound = useCallback(() => {
    setGameState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        rounds: [...prev.rounds, Array(prev.players.length).fill(0) as number[]],
      };
    });
  }, []);

  const handleUpdateScore = useCallback(
    (roundIdx: number, playerIdx: number, value: number) => {
      setGameState((prev) => {
        if (!prev) return prev;
        const newRounds = prev.rounds.map((round) => [...round]);
        newRounds[roundIdx]![playerIdx] = value;
        return computeGameState(prev, newRounds);
      });
    },
    [],
  );

  const handleRemoveRound = useCallback((roundIdx: number) => {
    setGameState((prev) => {
      if (!prev) return prev;
      const newRounds = prev.rounds.filter((_, idx) => idx !== roundIdx);
      return computeGameState(prev, newRounds);
    });
  }, []);

  const winners = useMemo(
    () => gameState?.players.filter((p) => p.isWinning) ?? [],
    [gameState?.players],
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
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
            onAddRound={handleAddRound}
            onUpdateScore={handleUpdateScore}
            onRemoveRound={handleRemoveRound}
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
