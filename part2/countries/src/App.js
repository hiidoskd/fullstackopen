
import axios from 'axios';
import {useState, useEffect} from 'react'
import Countries from './components/Countries';


function App() {
  const [newSearch, setNewSearch] = useState('')
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(false)

  const handleSearch = (event) => {
    setInput(event.target.value)
    setNewSearch(event.target.value.toLowerCase())
    setShow(false)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        search name: <input value={input} onChange={handleSearch} />
      </div>
      <Countries newSearch={newSearch} countries={countries} show={show} setShow={setShow} />
    </div>
  );
}

export default App;
