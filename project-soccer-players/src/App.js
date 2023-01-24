import { getAllPlayers } from './store/players-slice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Filters from './components/Filters';
import Details from './components/Details';
import GridView from './components/GridView';
import Header from './components/Header';
import Footer from './components/Footer';
import Favourites from './components/Favourites';
import Button from 'react-bootstrap/Button';
import { Routes, Route } from 'react-router-dom';
import { playersActions } from './store/players-slice';
import './styles/main.scss';

const App = () => {
  const dispatch = useDispatch();
  const modalShow = useSelector((state) => state.players.modalShow);
  const loading = useSelector((state) => state.players.loadingState);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, []);

  //{loading ? <p>Loading...</p> : <p>bbbbbb</p>}
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="headerBox">
                <Header />
              </div>
              <div className="row">
                <div className="col-3 filterBox">
                  <Filters />
                </div>
                <div className="col-9">
                  <div className="favouriteListButton">
                    <Button
                      variant="primary"
                      onClick={() => dispatch(playersActions.modalOpen())}
                    >
                      Favourite Players List
                    </Button>
                  </div>
                  <GridView />
                </div>
              </div>
              <Footer />
              <Favourites />
            </div>
          }
        ></Route>
        <Route
          path="/details"
          element={
            <div>
              <Details />
              <Footer />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
};
export default App;
