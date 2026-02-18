'use client';

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Stack,
  Chip,
  TableContainer,
} from '@mui/material';
import {
  Add as AddIcon,
  EmojiEvents as TrophyIcon,
  RestartAlt as ResetIcon,
} from '@mui/icons-material';
import type { GameState } from '../types/game';

interface ScoreTableProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
  onEndGame: () => void;
}

export const ScoreTable = ({ gameState, setGameState, onEndGame }: ScoreTableProps) => {
  const addRound = () => {
    setGameState((prev) => ({
      ...prev!,
      rounds: [...prev!.rounds, Array(prev!.players.length).fill(0)],
    }));
  };

  const updateScore = (roundIdx: number, playerIdx: number, value: number) => {
    setGameState((prev) => {
      const newRounds = prev!.rounds.map((round) => [...round]);
      newRounds[roundIdx]![playerIdx] = value;

      const newPlayers = prev!.players.map((player, idx) => ({
        ...player,
        totalScore: newRounds.reduce((sum, round) => sum + (round[idx] ?? 0), 0),
      }));

      const scores = newPlayers.map((p) => p.totalScore);
      const winningScore = prev!.isLowScoreWins
        ? Math.min(...scores)
        : Math.max(...scores);

      return {
        ...prev!,
        rounds: newRounds,
        players: newPlayers.map((player) => ({
          ...player,
          isWinning: player.totalScore === winningScore,
        })),
      };
    });
  };

  const removeRound = (roundIdx: number) => {
    setGameState((prev) => {
      const newRounds = prev!.rounds.filter((_, idx) => idx !== roundIdx);

      const newPlayers = prev!.players.map((player, idx) => ({
        ...player,
        totalScore: newRounds.reduce((sum, round) => sum + (round[idx] ?? 0), 0),
      }));

      const scores = newPlayers.map((p) => p.totalScore);
      const winningScore = newRounds.length > 0
        ? (prev!.isLowScoreWins ? Math.min(...scores) : Math.max(...scores))
        : 0;

      return {
        ...prev!,
        rounds: newRounds,
        players: newPlayers.map((player) => ({
          ...player,
          isWinning: newRounds.length > 0 && player.totalScore === winningScore,
        })),
      };
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" fontWeight={600}>
              Scoreboard
            </Typography>
            <Chip
              label={gameState.isLowScoreWins ? 'Low wins' : 'High wins'}
              size="small"
              color={gameState.isLowScoreWins ? 'info' : 'warning'}
              variant="outlined"
            />
          </Stack>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<ResetIcon />}
            onClick={onEndGame}
          >
            End Game
          </Button>
        </Stack>

        <TableContainer sx={{ maxHeight: '60vh', overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, minWidth: 50 }}>#</TableCell>
                {gameState.players.map((player, idx) => (
                  <TableCell key={idx} align="center" sx={{ fontWeight: 600 }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {player.name}
                      </Typography>
                      {player.isWinning && gameState.rounds.length > 0 && (
                        <TrophyIcon sx={{ fontSize: 18, color: '#FFD700' }} />
                      )}
                    </Stack>
                  </TableCell>
                ))}
                <TableCell sx={{ width: 40 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {gameState.rounds.map((round, roundIdx) => (
                <TableRow key={roundIdx} hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {roundIdx + 1}
                    </Typography>
                  </TableCell>
                  {round.map((score, playerIdx) => (
                    <TableCell key={playerIdx} align="center">
                      <TextField
                        type="number"
                        value={score}
                        onChange={(e) =>
                          updateScore(roundIdx, playerIdx, parseInt(e.target.value) || 0)
                        }
                        size="small"
                        inputProps={{ style: { textAlign: 'center' } }}
                        sx={{ width: { xs: 60, sm: 80 } }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeRound(roundIdx)}
                      sx={{ minWidth: 'auto', px: 1, fontSize: '0.75rem' }}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {gameState.rounds.length > 0 && (
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>
                      Total
                    </Typography>
                  </TableCell>
                  {gameState.players.map((player, idx) => (
                    <TableCell key={idx} align="center">
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color={player.isWinning ? 'success.main' : 'text.primary'}
                      >
                        {player.totalScore}
                      </Typography>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addRound}
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Add Round
        </Button>
      </CardContent>
    </Card>
  );
};
