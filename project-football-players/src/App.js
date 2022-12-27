import { useState, useEffect } from 'react';
import Firebase from './Firebase';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(
        'https://soccerplayers-27cac-default-rtdb.firebaseio.com/players.json'
      );
      const responseData = await response.json();
      const loadedPlayers = [];

      for (const team in responseData) {
        loadedPlayers.push({
          id: team,
          defans: responseData[team].defans,
          ortaSaha: responseData[team].ortaSaha,
          forvet: responseData[team].forvet,
          kaleci: responseData[team].kaleci,
        });
      }
      setData(loadedPlayers);
    };
    fetchPlayers();
  }, []);

  const playerList = data.map((takim) => <p key={takim.id}>{takim.id}</p>);

  return (
    <div>
      <p>{playerList}</p>
      <Firebase />
    </div>
  );
}

export default App;
