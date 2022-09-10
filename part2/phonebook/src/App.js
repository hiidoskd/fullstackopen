import axios from 'axios'
import { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
    
    const arr = persons.filter((person) => person.name === newName || person.number=== newNumber)

    if (arr.length > 0) {
      alert(`${newName} or ${newNumber}is already in the list`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h2>Add new contact</h2>
      <Form handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

      <h2>Numbers</h2>
      <Contacts persons={persons} searchName={searchName} />
    </div>
  )
}
export default App;
