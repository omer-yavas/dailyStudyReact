import { useState, useEffect, useContext } from 'react';
import Context from '../store/context';

const TakimListesi = (props) => {
  let ctx = useContext(Context);

  const takimAdi = props.liste;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (takimAdi) {
      const fetchPlayers = async () => {
        const response = await fetch(
          'https://soccerplayers-27cac-default-rtdb.firebaseio.com/players.json'
        );
        const responseData = await response.json();

        const { besiktas, fenerbahce } = responseData;

        if (takimAdi === 'besiktas') {
          const oyuncular = Object.values(besiktas);

          setData(oyuncular);
        } else if (takimAdi === 'fenerbahce') {
          const oyuncular = Object.values(fenerbahce);

          setData(oyuncular);
        }
      };
      fetchPlayers();
    }
  }, [takimAdi]);

  const clickHandler = (event) => {
    //ctx.playerName = event.target.value;
    ctx = { playerName: event.target.value };
    console.log(ctx.playerName);
  };

  return (
    <div>
      {data.map((x) => (
        <div>
          <button onClick={clickHandler} value={x} key={x}>
            {x}
          </button>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default TakimListesi;
