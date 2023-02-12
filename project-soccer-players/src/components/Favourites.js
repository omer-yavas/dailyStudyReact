import './Favourites.scss';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { playersActions } from '../store/players-slice';
import Button from 'react-bootstrap/esm/Button';
import { NavLink } from 'react-router-dom';

const Favourites = () => {
  const dispatch = useDispatch();
  const favouritePlayerIDs = useSelector(
    (state) => state.players.favouritePlayerIDs
  );

  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  const modalShow = useSelector((state) => state.players.modalShow);

  const allPlayers = useSelector((state) => state.players.allPlayers);

  const favouritePlayers = allPlayers.filter(({ player }) =>
    favouritePlayerIDs.includes(player.id)
  );

  const numberPrecisionHandler = (number) => {
    const exactRating = Number(number).toPrecision(2);
    return exactRating;
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => dispatch(playersActions.modalClose())}
    >
      <Modal.Header closeButton>
        <Modal.Title>Favourite Players List</Modal.Title>
      </Modal.Header>
      {!userLoggedIn ? (
        <div className='modal_loginRouter'>
          <p>You must login to see favourite players!</p>
          <NavLink to="/login">Login</NavLink>
        </div>
      ) : favouritePlayers.length > 0 ? (
        <div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Rate</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Injury Status</th>
              </tr>
            </thead>
            <tbody>
              {favouritePlayers.map(({ player, statistics }, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.age}</td>
                  <td>{statistics[0].games.position}</td>
                  <td> {numberPrecisionHandler(statistics[0].games.rating)}</td>
                  <td>{player.height}</td>
                  <td>{player.weight}</td>
                  <td>
                    {player.injured
                      ? 'Yes'
                      : player.injured === false
                      ? 'No'
                      : 'No data'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="danger"
            className="clearButton"
            onClick={() => dispatch(playersActions.clearFavourites())}
          >
            Clear Favourites List
          </Button>
        </div>
      ) : (
        <p className="noFavourite">"No Favourite Player Yet!"</p>
      )}
    </Modal>
  );
};

export default Favourites;
