'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import type { Player } from '../types/game';

interface WinnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Player[];
  onReset: () => void;
}

export const WinnerDialog = ({ isOpen, onClose, winners, onReset }: WinnerDialogProps) => {
  if (winners.length === 0) return null;

  const isTie = winners.length > 1;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle align="center" sx={{ pb: 0 }}>
        <Typography variant="h5" fontWeight={700}>
          {isTie ? 'It\'s a Tie!' : 'We Have a Winner!'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <TrophyIcon sx={{ fontSize: 72, color: '#FFD700', mb: 2 }} />
          <Stack spacing={1} alignItems="center">
            {winners.map((winner) => (
              <Box key={winner.name}>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {winner.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Score: {winner.totalScore}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Continue Game
        </Button>
        <Button onClick={onReset} variant="contained" sx={{ borderRadius: 2 }}>
          New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};
