const Currentweather = (props) => {
  if (props.weather == '') {
    return <div>Search Your city temp</div>;
  }

  const cityWeather = { ...props.weather };

  if (cityWeather.message == 'city not found') {
    return <div>City not found</div>;
  }

  return (
    <div>
      <p>Temperature:{cityWeather.main.temp}</p>
      <p>Humidity:{cityWeather.main.humidity}</p>
      <p>Windspeed:{cityWeather.wind.speed}</p>
      <p>weather description :{cityWeather.weather[0].description}</p>
    </div>
  );
};

export default Currentweather;
