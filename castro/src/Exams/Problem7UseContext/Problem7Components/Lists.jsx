function Lists({ selectedData, setSelectedData }) {
  const contextData = { data: {} };

  return contextData.data.length && contextData.data ? (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Release Date</th>
          <th>Director</th>
          <th>Actor 1</th>
          <th>Actor 2</th>
          <th>Rating</th>
          <th>Box Office</th>
          <th>Duration(Minutes)</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {contextData.data.map((row, index) => (
          <tr
            className={
              selectedData.id == index ? 'problem7tr selected' : 'problem7tr'
            }
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedData({ ...row, id: index })}
          >
            <td>{row.title}</td>
            <td>{row.genre}</td>
            <td>{row.release_date}</td>
            <td>{row.director}</td>
            <td>{row.actor_1}</td>
            <td>{row.actor_2}</td>
            <td>{row.rating}</td>
            <td>{row.box_office}</td>
            <td>{row.duration_minutes}</td>
            <td>{row.language}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Print the objects from useContext</p>
  );
  //   return <>Print the objects from useContext</>;
}

export default Lists;
