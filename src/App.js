import "./App.css";
import { useQueryErrorResetBoundary,useQuery } from "react-query";
import { useMemo, useTransition, useState, useEffect, Suspense } from "react";
import {ErrorBoundary} from 'react-error-boundary'

function App() {
  const { reset } = useQueryErrorResetBoundary()
  const [resetKey, setResetKey] = useState(0)
  return (
    <div className="App">
      <Suspense fallback={<>loading fallback</>}>
        <ErrorBoundary fallback={<>error fallback</>} resetKeys={[resetKey]}>
        <ComponentWithData />
        </ErrorBoundary>
      </Suspense>
      <br />
      <button onClick={()=>{
        reset()
        return setResetKey(Math.random());
      }}>reset error boundary</button>
    </div>
  );
}

function ComponentWithData() {
  const result = useQuery(
    "foo",
    async () => {
      console.log("query ran");
      return Promise.reject('rejected by Anthony Davis')
    },
    { retry: false, staleTime: Infinity, cacheTime: 0 }
  )
  console.log(result);
}

export default App;
