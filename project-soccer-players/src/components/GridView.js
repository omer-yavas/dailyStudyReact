import React from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { playersActions } from '../store/players-slice';
import { BsFillStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './GridView.scss';

const GridView = ({ products }) => {
  const dispatch = useDispatch();
  const playerArray = useSelector((state) => state.players.filteredPlayers);

  const navigate = useNavigate();

  const favouritePlayerIDs = useSelector(
    (state) => state.players.favouritePlayerIDs
  );

  const detailsButtonClickHandler = (player, statistics) => {
    dispatch(
      playersActions.showDetailOfThisPlayer({
        player,
        statistics,
      })
    );

    navigate('/details');
  };

  const numberPrecisionHandler = (number) => {
    const exactRating = Number(number).toPrecision(2);
    return exactRating;
  };

  if (playerArray.length > 0) {
    return (
      <Row xs={1} s={2} md={3} lg={4} className="g-4">
        {playerArray.map(({ player, statistics }, index) => (
          <Col>
            <Card>
              <div className="card__side card__side--front">
                {favouritePlayerIDs.includes(player.id) ? (
                  <BsFillStarFill />
                ) : null}
                <Card.Img variant="top" src={player.photo} />
                <Card.Body>
                  <Card.Title>{player.name}</Card.Title>
                  <div className="row">
                    <div className="col-6">
                      <Card.Text>Age:{player.age}</Card.Text>
                    </div>
                    <div className="col-6">
                      <Card.Text className="d-flex justify-content-end align-items-center">
                        Rate:
                        {numberPrecisionHandler(statistics[0].games.rating)}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </div>
              <div className="card__side card__side--back">
                <h4>
                  <u>Player Details</u>
                </h4>
                <p>Nationality:{player.nationality}</p>
                <p>Position:{statistics[0].games.position}</p>
                <p>Height: {player.height ? player.height : 'No data'}</p>
                <p>Weight: {player.weight ? player.weight : 'No data'}</p>
                <p>
                  Injury:
                  {player.injured
                    ? 'Yes'
                    : player.injured === false
                    ? 'No'
                    : 'No data'}
                </p>
                <div className="checkBox_border">
                  <Form.Check id="favouriteCheck">
                    <Form.Check.Input
                      checked={favouritePlayerIDs.includes(player.id)}
                      onChange={() =>
                        dispatch(
                          playersActions.favouriteSelected({
                            id: player.id,
                          })
                        )
                      }
                    ></Form.Check.Input>
                    <Form.Check.Label>Add Favourites</Form.Check.Label>
                  </Form.Check>
                </div>
                <Button
                  onClick={() => detailsButtonClickHandler(player, statistics)}
                >
                  More Details
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  } else {
    return (
      <div>
        <p className="noPlayer">No player matches your filter!</p>
      </div>
    );
  }
};

export default GridView;
