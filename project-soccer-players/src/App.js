import { getAllPlayers } from './store/players-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import Filters from './components/Filters';
import Details from './components/Details';
import GridView from './components/GridView';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Favourites from './components/Favourites';
import Button from 'react-bootstrap/Button';
import { Routes, Route, useLocation } from 'react-router-dom';
import { playersActions } from './store/players-slice';
import './styles/main.scss';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.players.loadingState);

  const ScrollUpDeatilsPage = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  useEffect(() => {
    dispatch(getAllPlayers());
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className="page">
      <ScrollUpDeatilsPage>
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </ScrollUpDeatilsPage>
    </div>
  );
};
export default App;
