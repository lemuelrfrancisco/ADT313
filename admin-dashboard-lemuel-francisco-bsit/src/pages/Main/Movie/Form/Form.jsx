import { useParams } from 'react-router-dom';

const Form = () => {
  let { movieId } = useParams();
  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>
      <h2>{movieId}</h2>
    </>
  );
};

export default Form;
