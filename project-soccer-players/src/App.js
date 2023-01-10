import { getAllPlayers } from './store/players-slice';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  dispatch(getAllPlayers());
  return <div>bbbbbb</div>;
};
export default App;
