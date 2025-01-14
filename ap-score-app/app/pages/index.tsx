import { useState } from 'react';
import PlayerSetup from '../components/PlayerSetup';
import ScoreTable from '../components/ScoreTable';

const Home = () => {
  const [players, setPlayers] = useState<string[] | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!players ? (
        <PlayerSetup onSetupComplete={setPlayers} />
      ) : (
        <ScoreTable players={players} />
      )}
    </div>
  );
};

export default Home;
