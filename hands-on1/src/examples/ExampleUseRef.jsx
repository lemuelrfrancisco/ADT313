import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';

export default function ExampleUseRef() {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 2000);

  useEffect(() => {
    // console.log('debounced');
    alert('useDebounce Trigger');
  }, [debouncedValue]);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <h3>{value}</h3>
      <input ref={inputRef} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
