'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface GameContextType {
  isLowScoreWins: boolean;
  setIsLowScoreWins: (value: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isLowScoreWins, setIsLowScoreWins] = useState(true);

  return (
    <GameContext.Provider value={{ isLowScoreWins, setIsLowScoreWins }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
