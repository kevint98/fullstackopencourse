// import { useEffect, useState } from 'react';
// import weatherService from '../services/weather';
import Weather from './Weather';

const Country = ({ country, countriesLength, toggleVisibility }) => {
  // const [weather, setWeather] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const languages = country.languages;

  const flagStyle = {
    height: 250,
    width: 'auto',
  };

  const getLanguages = (languages) => {
    let langs = [];

    for (const l in languages) {
      const lang = languages[l];
      langs.push(<li key={Object.keys(lang)}>{lang}</li>);
    }

    return langs;
  };

  if (countriesLength === 1 || country.isVisible) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <div className="country-stats">
          <p className="capital">capital: {country.capital[0]}</p>
          <p className="area">area: {country.area}</p>
          <p>
            <strong>languages:</strong>
          </p>
          <ul className="languages">{getLanguages(languages)}</ul>
        </div>
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          style={flagStyle}
          className="flag"
        />

        <Weather country={country} />

        <br />
        {countriesLength === 1 ? (
          ''
        ) : (
          <button onClick={toggleVisibility}>Hide</button>
        )}
      </>
    );
  } else {
    return (
      <>
        <p>
          {country.name.common}{' '}
          <button onClick={toggleVisibility}>
            {country.isVisible ? 'Hide' : 'Show'}
          </button>
        </p>
      </>
    );
  }
};

export default Country;
