function SelectedValue() {
  const contextData = { selected: null };

  return contextData.selected ? (
    <div
      style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}
    >
      <div>
        <p>Title:{contextData.selected.title}</p>
        <p>Genre:{contextData.selected.genre}</p>
        <p>Release Date:{contextData.selected.release_date}</p>
        <p>Director: {contextData.selected.director}</p>
        <p>Actor: {contextData.selected.actor_1}</p>
      </div>
      <div>
        <p>Actor: {contextData.selected.actor_2}</p>
        <p>Rating: {contextData.selected.rating}</p>
        <p>Box Office:{contextData.selected.box_office}</p>
        <p>Duration(Minutes): {contextData.selected.duration_minutes}</p>
        <p>Language: {contextData.selected.language}</p>
      </div>
    </div>
  ) : (
    <p>Display Selected Component</p>
  );
}

export default SelectedValue;
