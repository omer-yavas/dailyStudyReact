import { useState, useEffect } from 'react';

const TakimListesi = (props) => {
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
    props.secilen(event.target.value);
  };

  return (
    <div>
      {data.map((x) => (
        <div key={x}>
          <button onClick={clickHandler} value={x}>
            {x}
          </button>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default TakimListesi;
