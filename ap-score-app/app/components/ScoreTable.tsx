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
    Box
  } from '@mui/material';
  import { Add as AddIcon, EmojiEvents as TrophyIcon } from '@mui/icons-material';
  import type { GameState } from '@/types/game';
  
  interface ScoreTableProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
    onEndGame: () => void;
  }
  
  export const ScoreTable = ({ gameState, setGameState, onEndGame }: ScoreTableProps) => {
    const addRound = () => {
      setGameState(prev => ({
        ...prev!,
        rounds: [...prev!.rounds, Array(prev!.players.length).fill(0)]
      }));
    };
  
    const updateScore = (roundIdx: number, playerIdx: number, value: number) => {
      setGameState(prev => {
        const newRounds = [...prev!.rounds];
        newRounds[roundIdx][playerIdx] = value;
    
        const newPlayers = prev!.players.map((player, idx) => ({
          ...player,
          totalScore: newRounds.reduce((sum, round) => sum + (round[idx] || 0), 0),
        }));
    
        const scores = newPlayers.map(p => p.totalScore);
        const winningScore = gameState.isLowScoreWins
          ? Math.min(...scores)
          : Math.max(...scores);
    
        const winners = newPlayers.filter(player => player.totalScore === winningScore);
    
        return {
          ...prev!,
          rounds: newRounds,
          players: newPlayers.map(player => ({
            ...player,
            isWinning: winners.includes(player),
          })),
          winners,
        };
      });
    };
    return (
      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Score Table</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={onEndGame}
            >
              End Game
            </Button>
          </Box>
  
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                {gameState.players.map((player, idx) => (
                  <TableCell key={idx} align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {player.name}
                      {player.isWinning && (
                        <TrophyIcon sx={{ ml: 1, color: 'gold' }} />
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gameState.rounds.map((round, roundIdx) => (
                <TableRow key={roundIdx}>
                  <TableCell>{roundIdx + 1}</TableCell>
                  {round.map((score, playerIdx) => (
                    <TableCell key={playerIdx}>
                      <TextField
                        type="number"
                        value={score}
                        onChange={(e) => updateScore(roundIdx, playerIdx, parseInt(e.target.value) || 0)}
                        size="small"
                        sx={{ width: '100px' }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                {gameState.players.map((player, idx) => (
                  <TableCell key={idx} align="center">
                    <strong>{player.totalScore}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
  
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addRound}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Round
          </Button>
        </CardContent>
      </Card>
    );
  };
  