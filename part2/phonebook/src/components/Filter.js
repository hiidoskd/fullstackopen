

const Filter = (props) => {
  return (
    <div>
      search name: <input value={props.searchName} onChange={props.handleSearchChange} />
    </div>
  )
}

export default Filter;