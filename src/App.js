import "./App.css";
import { useQuery } from "react-query";
import { useMemo, useTransition, useState, useEffect } from "react";

function App() {
  const [variables, setVariables] = useState(() => Math.random());
  const [isPending, startTransition] = useTransition();
  
  const result = useQuery(
    ["foo", variables],
    async () => {
      console.log("query ran", variables);
      await new Promise((res) => setTimeout(res, 1000));
      return () => "foo" + variables;
    },
    { suspense: true, staleTime: Infinity, cacheTime: 0 }
  );
  
  const data = useMemo(() => {
    console.log("data changed", result.data);
    return result.data;
  }, [result.data]);
  
  useEffect(() => {
    console.log("mount");
    return () => console.log("unmount");
  });

  console.log(result);
  return (
    <div className="App">
      {JSON.stringify(result)}
      <button
        onClick={() => {
          startTransition(() => {
            setVariables(Math.random());
          });
        }}
      >
        fetch
      </button>
    </div>
  );
}

export default App;
