import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    weatherService
      .getWeather(country)
      .then((countryWeather) => setWeather(countryWeather))
      .catch((e) => {
        setErrorMessage('Could not fetch weather, please try again later...');
      });
  }, [country]);

  return (
    <>
      {weather ? (
        <div className="weather">
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.current.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Wind: {weather.current.wind_speed} m/s</p>
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
    </>
  );
};

export default Weather;
