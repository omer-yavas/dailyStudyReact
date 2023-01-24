import { useSelector, useDispatch } from 'react-redux';
import { playersActions } from '../store/players-slice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import './Details.scss';

const Details = () => {
  const dispatch = useDispatch();
  const { player, statistics } = useSelector((state) => state.players.detail);
  return (
    <div className="detailsPage">
      <div className="row">
        <div className="col-2">
          <img src={player.photo} />
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
              <p>Height: {player.height}</p>
              <p>Weight: {player.weight}</p>
            </div>
          </div>
        </div>
        <div className="col-2">
          <img src={statistics[0].team.logo} />{' '}
          <p className="detailsPage_teamName">
            Team: {statistics[0].team.name}
          </p>
        </div>
      </div>

      <div className="row detailsPage_InfoBox">
        <div className="col-6">
          <p className="statisticsHeader">GAMES</p>
          <div className="statisticsUnderline" />
          <p>Appearences: {statistics[0].games.appearences}</p>
          <p>Linups: {statistics[0].games.linups}</p>
          <p>Minutes: {statistics[0].games.minutes}</p>
          <p>Number: {statistics[0].games.number}</p>
          <p>Position: {statistics[0].games.position}</p>
          <p>Rating: {statistics[0].games.rating}</p>
          <p className="statisticsHeader">SHOTS</p>
          <div className="statisticsUnderline" />
          <p>Total: {statistics[0].shots.total}</p>
          <p>On: {statistics[0].shots.on}</p>
          <p className="statisticsHeader">GOALS</p>
          <div className="statisticsUnderline" />
          <p>Total: {statistics[0].goals.total}</p>
          <p>Conceded: {statistics[0].goals.conceded}</p>
          <p>Assists: {statistics[0].goals.assists}</p>
          <p>Saves: {statistics[0].goals.saves}</p>
        </div>
        <div className="col-6">
          <p className="statisticsHeader">PASSES</p>
          <div className="statisticsUnderline" />
          <p>Total: {statistics[0].passes.total}</p>
          <p>Key: {statistics[0].passes.key}</p>
          <p>Accuracy:{statistics[0].passes.accuracy}</p>
          <p className="statisticsHeader">TACKLES</p>
          <div className="statisticsUnderline" />
          <p>Total: {statistics[0].tackles.total}</p>
          <p>Blocks: {statistics[0].tackles.blocks}</p>
          <p>Interceptions: {statistics[0].tackles.interceptions}</p>
          <p className="statisticsHeader">CARDS</p>
          <div className="statisticsUnderline" />
          <p>Yellow: {statistics[0].cards.yellow}</p>
          <p>Yellowred: {statistics[0].cards.yellowred}</p>
          <p>Red:{statistics[0].cards.red}</p>
          <p className="statisticsHeader">FOULS</p>
          <div className="statisticsUnderline" />
          <p>Drawn: {statistics[0].fouls.drawn}</p>
          <p>Commited: {statistics[0].fouls.committed}</p>
        </div>
      </div>

      <Link to="/">Home Page</Link>
    </div>
  );
};

export default Details;
