import './App.css';
import { useState } from 'react';
import WeatherStatus from './components/WeatherStatus';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1e4465607eca8ceca64ca98d69878b2`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  };
  return (
    <div>
      <WeatherStatus current={weather} />
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
}

export default App;
