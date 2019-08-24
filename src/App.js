import React from "react";
import useGet from "./useGet";

const url = "https://mymoney-estudos.firebaseio.com/movimentacao/2019-08.json";

function App() {
  const data = useGet(url);
  const data2 = useGet("http://httpbin.org/ip");

  return (
    <div>
      <h1>MyMoney</h1>
      {JSON.stringify(data)}
      {data.loading && <p>loading...</p>}
      <br />

      <pre>{JSON.stringify(data2)}</pre>
    </div>
  );
}

export default App;
