const Currentweather = (props) => {
  let cityWeather = null;
  if (props.weather !== '' && props.weather instanceof Error) {
    return <p>An Error Happened!</p>;
  } else if (props.weather !== '' && !(props.weather instanceof Error)) {
    cityWeather = { ...props.weather };
  }

  return (
    <div>
      {cityWeather !== null ? (
        cityWeather.message ? (
          <p>{cityWeather.message}</p>
        ) : (
          <div>
            <p>Temperature:{cityWeather.main.temp}</p>
            <p>Humidity:{cityWeather.main.humidity}</p>
            <p>Windspeed:{cityWeather.wind.speed}</p>
            <p>weather description :{cityWeather.weather[0].description}</p>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Currentweather;

{
  /* <div>
          <p>Temperature:{cityWeather.main.temp}</p>
          <p>Humidity:{cityWeather.main.humidity}</p>
          <p>Windspeed:{cityWeather.wind.speed}</p>
          <p>weather description :{cityWeather.weather[0].description}</p>
        </div> */
}

{
  /* <p>{cityWeather.message}</p> */
}
