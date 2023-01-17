import { getAllPlayers } from './store/players-slice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Filters from './components/Filters';
import PlayerCard from './components/PlayerCard';
import GridView from './components/GridView';
import Header from './components/Header';
import './styles/main.scss';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.players.loadingState);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, []);

  //{loading ? <p>Loading...</p> : <p>bbbbbb</p>}
  return (
    <div className="container ">
      <div className="row">
        <Header></Header>
      </div>
      <div className="row">
        <div className="col-3">
          <Filters></Filters>
        </div>
        <div className="col-9">
          <GridView></GridView>
        </div>
      </div>
    </div>
  );
};
export default App;
