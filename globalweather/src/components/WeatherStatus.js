const WeatherStatus = (props) => {
  const a = { ...props.current };
  console.log(a);
  return (
    {props.current==''?null :}<div>
      {props.current !== '' ? <p>{props.current.main.temp}</p> : <p>Loading</p>}
    </div>
  );
};

export default WeatherStatus;

//emperature, humidity, wind speed, and weather description
