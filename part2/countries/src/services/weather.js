import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?';

const getWeather = (country) => {
  const lat = country.latlng[0];
  const lon = country.latlng[1];
  const request = axios.get(
    `${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

export default {
  getWeather,
};
