import { getAllPlayers } from './store/players-slice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Filters from './components/Filters';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.players.loadingState);
  // useEffect(() => {
  //   dispatch(getAllPlayers());
  // }, []);
  //{loading ? <p>Loading...</p> : <p>bbbbbb</p>}
  return (
    <div>
      <Filters></Filters>
    </div>
  );
};
export default App;
