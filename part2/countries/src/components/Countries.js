import axios from 'axios';
import {useState, useEffect} from 'react'

const Countries = (props) => {
  const [index, setIndex] = useState(0)
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY


  const sortedCountries = props.countries
    .filter(country => country.name.official.toLowerCase().includes(props.newSearch))


  if (props.show === true) {
    
    const lat = sortedCountries[index].capitalInfo.latlng[0]
    const lon = sortedCountries[index].capitalInfo.latlng[1]
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then( response => {
          setWeather(response.data)
          console.log(weather)
        })

    return (
      <div>
        <h2>{sortedCountries[index].name.common}</h2>
        <p>Capital {sortedCountries[index].capital}</p>
        <p>Area {sortedCountries[index].area}</p>
        <h3>Languages</h3>
        <div>
          {(Object.values(sortedCountries[index].languages)).map(lang => 
            <p key={lang}> {lang} </p>
          )}
        </div>
        <img src={sortedCountries[index].flags.png} alt="flag" />
      </div> 
    )
  } else if (sortedCountries.length <= 10) {
    return (
      <div>
        {sortedCountries.map((country, index) =>
            <div key={country.name.common}>{country.name.common}
            <button onClick={() => {
              setIndex(index)
              props.setShow(true)
              }}>show</button>
            </div>
          )}
      </div>
    )
  } else {
    return (
      <p>Too many countries to show</p>
    )
  }
};

export default Countries;