import { useTeamsContext } from '../context/teams_context';

function Teams() {
  const teams = useTeamsContext();

  return (
    <div>
      {teams.map((singleTeam) => (
        <div key={singleTeam.team.id}>
          <img src={singleTeam.team.logo}></img>
          <p>{singleTeam.team.name}</p>
          <p>{singleTeam.team.id}</p>
        </div>
      ))}
    </div>
  );
}

export default Teams;
