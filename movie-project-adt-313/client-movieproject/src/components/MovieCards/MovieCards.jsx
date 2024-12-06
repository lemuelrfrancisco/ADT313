import './MovieCards.css';
function MovieCards({ movie: movie, onClick }) {
  return (
    <>
      <div className='card' onClick={onClick}>
        <img src={movie.posterPath} />
        <span>{movie.title}</span>
      </div>
    </>
  );
}

export default MovieCards;
