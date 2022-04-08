import "./App.css";
import { useQueryErrorResetBoundary, useQuery } from "react-query";
import { startTransition, useEffect, useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const [resetKey, setResetKey] = useState(0);
  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  });
  reset()
  return (
    <div className="App">
      <Suspense fallback={<>loading fallback</>}>
        <ErrorBoundary fallback={<>error fallback</>} resetKeys={[resetKey]} onReset={reset}>
          <ComponentWithData v={resetKey} />
        </ErrorBoundary>
      </Suspense>
      <br />
      <button
        onClick={() => {
          return startTransition(()=> setResetKey(key => key === 0 ? 1 : 0));
        }}
      >
        reset error boundary
      </button>
    </div>
  );
}

function ComponentWithData({v}) {
  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  });
  const result = useQuery(
    ['foo', v],
    async () => {
      console.log('query ran');
      if (v === 0)
        return Promise.reject('rejected by Anthony Davis');
      return Promise.resolve('resolved by James Harden');
    },
    { retry: false, staleTime: Infinity, cacheTime: Infinity }
  );
  console.log(result);
}

export default App;
