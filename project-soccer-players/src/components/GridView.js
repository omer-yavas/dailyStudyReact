import React from 'react';
import styled from 'styled-components';
import PlayerCard from './PlayerCard';

const GridView = ({ products }) => {
  const allPlayers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="container">
      <div className="row">
        {allPlayers.map((player, index) => {
          return (
            <div className="col-4">
              <PlayerCard key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
