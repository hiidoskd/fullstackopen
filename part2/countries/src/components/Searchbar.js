const Searchbar = (props) => {
  return (
    <div>
      search name: <input value={props.searchName} onChange={props.handleSearch} />
    </div>
  )
}

export default Searchbar;