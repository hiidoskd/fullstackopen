// import axios from 'axios'
import { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import contactService from './services/contacts'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    contactService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = event => {
    setSearchName(event.target.value)
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const found = persons.find(person => person.name === newName)
    if (found) {
      if (
        window.confirm(
          `${newName} is already in the list\nDo you want to change the number?`
        )
      ) {
        newPerson.id = found.id
        contactService
          .update(found.id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== returnedPerson.id ? person : newPerson
              )
            )
          })
          .catch(error => {
            // console.log(error)
            if (error) setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(person => person.id !== found.id))
          })
      }
    } else {
      contactService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setSuccessMessage(`'${person.name}' was added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const handleDeleteBtn = id => {
    if (window.confirm(`Delete?`)) {
      contactService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={successMessage}
        class="success"
      />
      <Notification
        message={errorMessage}
        class="error"
      />
      <Filter
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add new contact</h2>
      <Form
        handleFormSubmit={handleFormSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Contacts
        persons={persons}
        searchName={searchName}
        handleDeleteBtn={handleDeleteBtn}
      />
    </div>
  )
}
export default App
