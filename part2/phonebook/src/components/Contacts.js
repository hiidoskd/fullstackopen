

const Contacts = (props) => {
  return (
    <div>
      {props.persons.filter(person => person.name.toLowerCase().includes(props.searchName)).map(person => {
        return <p key={person.id}>{person.id} {person.name} {person.number}</p>
      })}
    </div>
  )
}

export default Contacts;