import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Box
} from '@mui/material';

interface PlayerSetupProps {
  onStart: (players: string[]) => void;
}

export const PlayerSetup = ({ onStart }: PlayerSetupProps) => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [names, setNames] = useState<string[]>(Array(2).fill(''));
  const [isLowScoreWins, setIsLowScoreWins] = useState(true);

  const handleNumPlayersChange = (value: number) => {
    setNames(prevNames => {
      const newNames = [...prevNames];
      if (value > prevNames.length) {
        newNames.push(...Array(value - prevNames.length).fill(''));
      } else {
        newNames.length = value;
      }
      return newNames;
    });
    setNumPlayers(value);
  };
  

  const handleStart = () => {
    if (names.every(name => name.trim())) {
      onStart(names);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Score Tracker Setup
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Number of Players</InputLabel>
          <Select
            value={numPlayers}
            label="Number of Players"
            onChange={(e) => handleNumPlayersChange(e.target.value as number)}
          >
            {[2, 3, 4].map((num) => (
              <MenuItem key={num} value={num}>
                {num} Players
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {names.map((name, idx) => (
          <TextField
            key={idx}
            fullWidth
            label={`Player ${idx + 1} Name`}
            value={name}
            onChange={(e) => {
              const newNames = [...names];
              newNames[idx] = e.target.value;
              setNames(newNames);
            }}
            margin="normal"
          />
        ))}

        <FormControlLabel
          control={
            <Switch
              checked={isLowScoreWins}
              onChange={(e) => setIsLowScoreWins(e.target.checked)}
            />
          }
          label={isLowScoreWins ? "Lower score wins" : "Higher score wins"}
          sx={{ my: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleStart}
          disabled={!names.every(name => name.trim())}
          sx={{ mt: 2 }}
        >
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
};
