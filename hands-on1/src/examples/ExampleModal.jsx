import { useEffect, useState } from 'react';

export default function ExampleModal() {
  const [name, setName] = useState('');
  const [section, setSection] = useState('');

  useEffect(() => {
    console.log(`you update the value of name to ${name}`);
  }, [name]);

  const handeClick = () => {
    const response = window.confirm('Are you sure that you want to continue?');
    console.log(response, 'do logic if true');
    if (response) setName('Lem');
  };
  return (
    <>
      <h1 onClick={() => alert('you clicked the header.')}>header</h1>
      <button type='button' onClick={handeClick}>
        Proceed
      </button>
      <button type='button' onClick={() => setSection('section123')}>
        Update Section
      </button>
    </>
  );
}
