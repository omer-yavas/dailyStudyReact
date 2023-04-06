const Currentweather = (props) => {
  let cityWeather = null;
  if (props.weather instanceof Error) {
    return <p>An Error Happened!</p>;
  } else {
    cityWeather = { ...props.weather };
  }

  return (
    <div>
      {!cityWeather.message ? (
        <div>
          <p>Temperature:{cityWeather.main.temp}</p>
          <p>Humidity:{cityWeather.main.humidity}</p>
          <p>Windspeed:{cityWeather.wind.speed}</p>
          <p>weather description :{cityWeather.weather[0].description}</p>
        </div>
      ) : (
        <p>{cityWeather.message}</p>
      )}
    </div>
  );
};

export default Currentweather;
