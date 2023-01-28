import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import './Details.scss';

const Details = () => {
  const navigate = useNavigate();
  const { player, statistics } = useSelector((state) => state.players.detail);

  const numberPrecisionHandler = (number) => {
    const exactRating = Number(number).toPrecision(2);
    return exactRating;
  };

  const appearences = statistics[0].games.appearences
    ? statistics[0].games.appearences
    : 'No Data';

  const linups = statistics[0].games.linups
    ? statistics[0].games.linups
    : 'No Data';

  const minutes = statistics[0].games.minutes
    ? statistics[0].games.minutes
    : 'No Data';

  const number = statistics[0].games.number
    ? statistics[0].games.number
    : 'No Data';

  const position = statistics[0].games.position
    ? statistics[0].games.position
    : 'No Data';

  const rating = statistics[0].games.rating
    ? numberPrecisionHandler(statistics[0].games.rating)
    : 'No Data';

  const totalshots = statistics[0].shots.total
    ? statistics[0].shots.total
    : 'No Data';

  const onshots = statistics[0].shots.on ? statistics[0].shots.on : 'No Data';

  const totalgoals = statistics[0].goals.total
    ? statistics[0].goals.total
    : 'No Data';

  const conceded = statistics[0].goals.conceded
    ? statistics[0].goals.conceded
    : 'No Data';

  const assists = statistics[0].goals.assists
    ? statistics[0].goals.assists
    : 'No Data';

  const saves = statistics[0].goals.saves
    ? statistics[0].goals.saves
    : 'No Data';

  const totalpasses = statistics[0].passes.total
    ? statistics[0].passes.total
    : 'No Data';

  const key = statistics[0].passes.key ? statistics[0].passes.key : 'No Data';

  const accuracy = statistics[0].passes.accuracy
    ? statistics[0].passes.accuracy
    : 'No Data';

  const tacklestotal = statistics[0].tackles.total
    ? statistics[0].tackles.total
    : 'No Data';

  const blocks = statistics[0].tackles.blocks
    ? statistics[0].tackles.blocks
    : 'No Data';

  const interceptions = statistics[0].tackles.interceptions
    ? statistics[0].tackles.interceptions
    : 'No Data';

  const yellow = statistics[0].cards.yellow
    ? statistics[0].cards.yellow
    : 'No Data';

  const yellowred = statistics[0].cards.yellowred
    ? statistics[0].cards.yellowred
    : 'No Data';

  const red = statistics[0].cards.red ? statistics[0].cards.red : 'No Data';

  const drawn = statistics[0].fouls.drawn
    ? statistics[0].fouls.drawn
    : 'No Data';

  const committed = statistics[0].fouls.committed
    ? statistics[0].fouls.committed
    : 'No Data';

  return (
    <div className="detailsPage">
      <div className="row">
        <div className="col-2">
          <img src={player.photo} alt="player" />
        </div>
        <div className="col-8">
          {' '}
          <p className="detailsPage_playerName">
            <u>{player.name}</u>
          </p>
          <div className="row ">
            <div className="col-6">
              <p>Age: {player.age}</p>
              <p>Nationality: {player.nationality}</p>
            </div>
            <div className="col-6">
              <p>Height: {player.height ? player.height : 'No data'}</p>
              <p>Weight: {player.weight}</p>
            </div>
          </div>
        </div>
        <div className="col-2">
          <img src={statistics[0].team.logo} alt="team logo" />{' '}
          <p className="detailsPage_teamName">
            Team: {statistics[0].team.name}
          </p>
        </div>
      </div>

      <div className="row detailsPage_InfoBox">
        <div className="col-6">
          <p className="statisticsHeader">GAMES</p>
          <div className="statisticsUnderline" />
          <p>Appearences: {appearences}</p>
          <p>Linups: {linups}</p>
          <p>Minutes: {minutes}</p>
          <p>Number: {number}</p>
          <p>Position: {position}</p>
          <p>Rating: {rating}</p>
          <p className="statisticsHeader">SHOTS</p>
          <div className="statisticsUnderline" />
          <p>Total: {totalshots}</p>
          <p>On: {onshots}</p>
          <p className="statisticsHeader">GOALS</p>
          <div className="statisticsUnderline" />
          <p>Total: {totalgoals}</p>
          <p>Conceded: {conceded}</p>
          <p>Assists: {assists}</p>
          <p>Saves: {saves}</p>
        </div>
        <div className="col-6">
          <p className="statisticsHeader">PASSES</p>
          <div className="statisticsUnderline" />
          <p>Total: {totalpasses}</p>
          <p>Key: {key}</p>
          <p>Accuracy:{accuracy}</p>
          <p className="statisticsHeader">TACKLES</p>
          <div className="statisticsUnderline" />
          <p>Total: {tacklestotal}</p>
          <p>Blocks: {blocks}</p>
          <p>Interceptions: {interceptions}</p>
          <p className="statisticsHeader">CARDS</p>
          <div className="statisticsUnderline" />
          <p>Yellow: {yellow}</p>
          <p>Yellowred: {yellowred}</p>
          <p>Red:{red}</p>
          <p className="statisticsHeader">FOULS</p>
          <div className="statisticsUnderline" />
          <p>Drawn: {drawn}</p>
          <p>Commited: {committed}</p>
        </div>
      </div>

      <Button variant="warning" onClick={() => navigate('/')}>
        Home Page
      </Button>
    </div>
  );
};

export default Details;
