import styled from 'styled-components';

const PlayerCard = () => {
  return (
    <div>
      <div className="player">
        <div className="player_image">
          <img
            src={'https://media.api-sports.io/football/players/625.png'}
            alt="player_image"
          />
        </div>
        <h3 className="player_name">Ronaldo</h3>
        <span className="player_age">33</span>
      </div>
    </div>
  );
};
const Wrapper = styled.article`
  .player {
    position: relative;
    margin-top: 20px;
    border-radius: 20px;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    border: 2px solid #e6eaf2;
  }
  .player_image {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  .player_name {
    display: block;
    width: 100%;
    font-size: 17px;
    font-weight: 600;
    color: #0e2d49;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    margin-top: 15px;
  }
  .player_age {
    font-size: 16px;
    color: #626f83;
    margin-top: 5px;
    display: block;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }
`;
export default PlayerCard;
