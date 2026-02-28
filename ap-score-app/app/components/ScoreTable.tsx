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
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  EmojiEvents as TrophyIcon,
  RestartAlt as ResetIcon,
  DeleteOutline as DeleteIcon,
} from '@mui/icons-material';
import { TROPHY_GOLD } from '../lib/gameLogic';
import type { GameState } from '../types/game';

interface ScoreTableProps {
  gameState: GameState;
  onAddRound: () => void;
  onUpdateScore: (roundIdx: number, playerIdx: number, value: number) => void;
  onRemoveRound: (roundIdx: number) => void;
  onEndGame: () => void;
}

export const ScoreTable = ({
  gameState,
  onAddRound,
  onUpdateScore,
  onRemoveRound,
  onEndGame,
}: ScoreTableProps) => (
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
          color="primary"
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
              {gameState.players.map((player) => (
                <TableCell
                  key={player.name}
                  align="center"
                  sx={{ fontWeight: 600 }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={0.5}
                  >
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {player.name}
                    </Typography>
                    {player.isWinning && gameState.rounds.length > 0 && (
                      <TrophyIcon
                        sx={{ fontSize: 18, color: TROPHY_GOLD }}
                        aria-label="currently winning"
                        titleAccess="Currently winning"
                      />
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
                  <TableCell
                    key={gameState.players[playerIdx]?.name}
                    align="center"
                  >
                    <TextField
                      type="number"
                      value={score}
                      onChange={(e) =>
                        onUpdateScore(
                          roundIdx,
                          playerIdx,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      size="small"
                      inputProps={{
                        style: { textAlign: 'center' },
                        'aria-label': `Round ${roundIdx + 1} score for ${gameState.players[playerIdx]?.name}`,
                      }}
                      sx={{ width: { xs: 60, sm: 80 } }}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onRemoveRound(roundIdx)}
                    aria-label={`Remove round ${roundIdx + 1}`}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
                {gameState.players.map((player) => (
                  <TableCell key={player.name} align="center">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={0.5}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color={
                          player.isWinning ? 'success.main' : 'text.primary'
                        }
                      >
                        {player.totalScore}
                      </Typography>
                      {player.isWinning && (
                        <TrophyIcon
                          sx={{ fontSize: 14, color: TROPHY_GOLD }}
                          aria-hidden="true"
                        />
                      )}
                    </Stack>
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            )}
            {gameState.rounds.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={gameState.players.length + 2}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No rounds yet. Tap &quot;Add Round&quot; to start tracking
                    scores.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAddRound}
        fullWidth
        sx={{ mt: 2, borderRadius: 2 }}
      >
        Add Round
      </Button>
    </CardContent>
  </Card>
);
