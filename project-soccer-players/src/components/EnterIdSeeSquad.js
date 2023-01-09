import { usePlayersContext } from '../context/players_context';

const EnterID = () => {
  const { setTeamID } = usePlayersContext();

  const submitHandler = (event) => {
    event.preventDefault();
    setTeamID(event.target.id.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <input name="id"></input>
      <button>ID</button>
    </form>
  );
};

export default EnterID;
