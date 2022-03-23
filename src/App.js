import "./App.css";
import { useQuery } from "react-query";
import { useTransition } from "react";

function App() {
  const [isPending, startTransition] = useTransition();
  const result = useQuery(
    "foo",
    async () => {
      console.log('query ran')
      await new Promise((res) => setTimeout(res, 1000));
      return () => "foo" + Math.random();
    },
    { suspense: true, staleTime: 0, cacheTime: 0 }
  );
  console.log(result);
  return (
    <div className="App">
      {JSON.stringify(result)}
      <button
        onClick={() => {
          startTransition(() => {
            result.refetch();
          });
        }}
      >
        fetch
      </button>
    </div>
  );
}

export default App;
