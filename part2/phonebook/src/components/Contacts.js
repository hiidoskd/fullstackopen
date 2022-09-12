
const Contacts = (props) => {
  return (
    <div>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))
        .map(person => {
        return (
        <p key={person.id}>{person.id} {person.name} {person.number} 
          <button onClick={() => props.handleDeleteBtn(person.id)}>delete</button>
        </p>)
      })}
    </div>
  )
}

export default Contacts;