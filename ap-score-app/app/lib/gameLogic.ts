import type { GameState } from '../types/game';

export const TROPHY_GOLD = '#FFD700';

export const computeGameState = (
  prev: GameState,
  newRounds: number[][],
): GameState => {
  const newPlayers = prev.players.map((player, idx) => ({
    ...player,
    totalScore: newRounds.reduce((sum, round) => sum + (round[idx] ?? 0), 0),
  }));

  const scores = newPlayers.map((p) => p.totalScore);
  const hasRounds = newRounds.length > 0;
  const winningScore = hasRounds
    ? prev.isLowScoreWins
      ? Math.min(...scores)
      : Math.max(...scores)
    : null;

  return {
    ...prev,
    rounds: newRounds,
    players: newPlayers.map((player) => ({
      ...player,
      isWinning: winningScore !== null && player.totalScore === winningScore,
    })),
  };
};
