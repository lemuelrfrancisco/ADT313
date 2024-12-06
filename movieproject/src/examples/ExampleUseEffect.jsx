import { useState, useEffect } from 'react';

export default function ExampleUseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //example call api
    console.log('execute call api or check values');
  }, []);

  useEffect(() => {
    console.log('Trigger Use Effect');
  }, [count]);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton handleButtonClick={handleClick} count={count} />
    </div>
  );
}

function MyButton({ handleButtonClick, count }) {
  return <button onClick={handleButtonClick}>Clicked {count} times</button>;
}
