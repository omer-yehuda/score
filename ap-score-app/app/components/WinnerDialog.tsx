import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box
  } from '@mui/material';
  import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
  import type { Player } from '@/types/game';
  
  interface WinnerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    winner?: Player;
    onReset: () => void;
  }
  
  export const WinnerDialog = ({ isOpen, onClose, winner, onReset }: WinnerDialogProps) => {
    if (!winner) return null;
  
    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle align="center">🎉 We Have a Winner! 🎉</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <TrophyIcon sx={{ fontSize: 60, color: 'gold', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              {winner.name}
            </Typography>
            <Typography variant="h6">
              Total Score: {winner.totalScore}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={onClose} variant="outlined">
            Continue Game
          </Button>
          <Button onClick={onReset} variant="contained">
            New Game
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  