export interface Player {
    name: string;
    totalScore: number;
    isWinning: boolean;
  }
  
  export interface GameState {
    isFinished: boolean;
    rounds: number[][];
    players: Player[];
    isLowScoreWins: boolean;
  }
