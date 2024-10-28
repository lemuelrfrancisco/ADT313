import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age':
      return {
        age: state.age + 1,
      };
      break;

    case 'decremented_age':
      return {
        age: state.age - 1,
      };
      break;

    default:
      throw Error('Unknown action.');
      break;
  }
  //   if (action.type === 'incremented_age') {

  //   }
  //   throw Error('Unknown action.');
}

export default function ExampleUseReducer() {
  const [state, dispatch] = useReducer(reducer, { age: 80 });

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: 'incremented_age' });
        }}
      >
        Increment age
      </button>

      <button
        onClick={() => {
          dispatch({ type: 'decremented_age' });
        }}
      >
        Decrement age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
