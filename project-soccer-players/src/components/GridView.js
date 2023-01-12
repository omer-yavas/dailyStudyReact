import React from 'react';
import PlayerCard from './PlayerCard';
import { AiFillStar } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const GridView = ({ products }) => {
  const allPlayers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Row xs={1} md={4} className="g-4">
      {allPlayers.map((_, idx) => (
        <Col>
          <Card>
            <Card.Img
              variant="top"
              src={'https://media.api-sports.io/football/players/625.png'}
            />
            <Card.Body>
              <Card.Title>Raul Gonzales</Card.Title>
              <div className="row">
                <div className="col-6">
                  <Card.Text>Age:32</Card.Text>
                </div>
                <div className="col-6">
                  <Card.Text>
                    <AiFillStar />
                    7.6
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
};

export default GridView;
