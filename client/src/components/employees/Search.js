export default function Search(props) {
  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Search'
        // onChange={(e) => props.fromChild(e.target.value)}
        onInput={(e) => props.fromChild(e.target.value)}
      />
    </div>
  );
}
