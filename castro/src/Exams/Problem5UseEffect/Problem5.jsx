import { useEffect, useRef, useState } from 'react';
import Loading from './Problem5Components/Loading';
export default function Problem5() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div style={{ display: 'block' }}>
            Input: <input type='text' />
            <p>User is idle...</p>
          </div>
        </>
      )}
    </>
  );
}
