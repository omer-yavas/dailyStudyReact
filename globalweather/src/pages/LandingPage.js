import Form from '../components/Form';
import Currentweather from '../components/Currentweather';
import { useState } from 'react';

const LandingPage = () => {
  const [weather, setWeather] = useState('');
  const getWeather = (currentWeather) => {
    setWeather(currentWeather);
  };
  return (
    <div>
      <Currentweather weather={weather} />
      <Form getWeather={getWeather} />
    </div>
  );
};

export default LandingPage;
