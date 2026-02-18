'use client';

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
  Box,
  Stack,
} from '@mui/material';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

interface PlayerSetupProps {
  onStart: (players: string[], isLowScoreWins: boolean) => void;
}

export const PlayerSetup = ({ onStart }: PlayerSetupProps) => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [names, setNames] = useState<string[]>(Array(2).fill(''));
  const [isLowScoreWins, setIsLowScoreWins] = useState(true);

  const handleNumPlayersChange = (value: number) => {
    setNames((prevNames) => {
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
    if (names.every((name) => name.trim())) {
      onStart(names, isLowScoreWins);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 420,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <SportsScoreIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight={600} align="center">
            Game Setup
          </Typography>
        </Stack>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Number of Players</InputLabel>
          <Select
            value={numPlayers}
            label="Number of Players"
            onChange={(e) => handleNumPlayersChange(e.target.value as number)}
          >
            {[2, 3, 4, 5, 6].map((num) => (
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
            margin="dense"
            size="small"
          />
        ))}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: isLowScoreWins ? 'info.50' : 'warning.50',
            border: '1px solid',
            borderColor: isLowScoreWins ? 'info.200' : 'warning.200',
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={isLowScoreWins}
                onChange={(e) => setIsLowScoreWins(e.target.checked)}
                color={isLowScoreWins ? 'info' : 'warning'}
              />
            }
            label={
              <Typography variant="body2" fontWeight={500}>
                {isLowScoreWins ? 'Lower score wins' : 'Higher score wins'}
              </Typography>
            }
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleStart}
          disabled={!names.every((name) => name.trim())}
          sx={{
            mt: 1,
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
};
