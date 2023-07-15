import { useState, useEffect } from 'react';
import countriesService from './services/countries';
// import weatherService from './services/weather';

import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  // const [weather, setWeather] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

  const handleSearch = (event) => setSearch(event.target.value);

  const sortCountries = (a, b) => {
    const nameA = a.name.common;
    const nameB = b.name.common;

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  };

  // const getWeather = (country) => {
  //   console.log(country);
  //   weatherService.getWeather(country);
  //   // .then((countryWeather) => setWeather([...weather, countryWeather]))
  //   // .catch(
  //   //   setErrorMessage('Something went wrong, please try again later...')
  //   // );
  // };

  const toggleVisibility = (cca2) => {
    const country = countries.find((c) => c.cca2 === cca2);
    const changedCountry = { ...country, isVisible: !country.isVisible };
    setCountries(countries.map((c) => (c.cca2 !== cca2 ? c : changedCountry)));
  };

  const countriesToShow =
    search === ''
      ? countries
      : countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .sort(sortCountries);
  return (
    <>
      <div>
        find countries{' '}
        <input type="text" value={search} onChange={handleSearch} />
      </div>
      <div>
        {countriesToShow.length > 10 ? (
          <p>Too many countries, specify another filter</p>
        ) : (
          <>
            {countriesToShow.map((country) => (
              <Country
                key={country.cca2}
                country={country}
                countriesLength={countriesToShow.length}
                toggleVisibility={() => toggleVisibility(country.cca2)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default App;
