import { useEffect, useState } from 'react';
import Axios from 'axios';

const Extra = () => {
  const [teams, setTeams] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams?league=78&season=2022',
    headers: {
      'X-RapidAPI-Key': '62ec314e02msha83008fa1cbc55ep1d9675jsn3246344f664a',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  const fetchProducts = async () => {
    const { data } = await Axios.request(options);
    const products = data.response;
    setTeams(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {teams.map((product) => (
        <p key={product.team.id}>{product.team.name}</p>
      ))}
    </div>
  );
};

export default Extra;
