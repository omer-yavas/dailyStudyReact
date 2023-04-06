import { useState } from 'react';

const Form = (props) => {
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city == '') {
      return alert('Enter a city name');
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1e4465607eca8ceca64ca98d69878b2`
    )
      .then((response) => {
        response.json();
      })
      .then((data) => props.getWeather(data))
      .catch((error) => {
        props.getWeather(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          City Name:
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          ></input>
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Form;
