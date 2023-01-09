import { usePlayersContext } from '../context/players_context';

function SelectedTeamPlayers() {
  const { players } = usePlayersContext();
  console.log(players);

  if (players.length > 5) {
    return (
      <div>
        {players.map((singlePlayer) => (
          <div key={singlePlayer.player.id}>
            <img src={singlePlayer.player.photo}></img>
            <p>{singlePlayer.player.name}</p>
            <p>{singlePlayer.statistics[0].games.position}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div></div>;
}

export default SelectedTeamPlayers;
