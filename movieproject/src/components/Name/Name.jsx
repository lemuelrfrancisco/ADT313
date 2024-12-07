import './Name.css';

function Name({firstName, middleInitial, lastName}) {
  return (
    <h1 className='name'>{firstName} {middleInitial} {lastName}</h1>
  );
}

export default Name;
