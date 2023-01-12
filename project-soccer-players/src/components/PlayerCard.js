import backImage from '../utils/playerCard.png';

const PlayerCard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <img src={'https://media.api-sports.io/football/players/625.png'} />
        </div>
        <div className="col-4">
          <div className="row">Thiago Silva</div>
          <div className="row">Chelsea -- Defender</div>
        </div>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-2"></div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default PlayerCard;
