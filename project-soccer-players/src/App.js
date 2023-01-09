import Teams from './components/Teams';
import EnterID from './components/EnterIdSeeSquad';
import SelectedTeamPlayers from './components/SelectedTeamPlayers';
const App = () => {
  return (
    <div>
      <EnterID></EnterID>
      <Teams></Teams>
      <SelectedTeamPlayers />
    </div>
  );
};
export default App;
