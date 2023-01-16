import React from 'react';
import PlayerCard from './PlayerCard';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const GridView = ({ products }) => {
  const playerArray = useSelector((state) => state.players.filteredPlayers);
  console.log(playerArray);
  const numberPrecisionHandler = (number) => {
    const exactRating = Number(number).toPrecision(2);
    return exactRating;
  };

  if (playerArray.length > 0) {
    return (
      <Row xs={1} md={4} className="g-4">
        {playerArray.map((player, index) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={player.player.photo} />
              <Card.Body>
                <Card.Title>{player.player.name}</Card.Title>
                <div className="row">
                  <div className="col-6">
                    <Card.Text>{player.player.age}</Card.Text>
                  </div>
                  <div className="col-6">
                    <Card.Text>
                      <AiFillStar />
                      {numberPrecisionHandler(
                        player.statistics[0].games.rating
                      )}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      // {<div className="container">
      //   <div className="row">
      //     {allPlayers.map((player, index) => {
      //       return (
      //         <div className="col-4">
      //           <PlayerCard key={index} />
      //         </div>
      //       );
      //     })}
      //   </div>
      // </div>}
    );
  } else {
    return <div />;
  }
};

export default GridView;
