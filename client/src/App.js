import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [apiText, setApiText] = useState([]);
  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        setApiText(jsonRes["message"]);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>LINFO1311 interface homme machine</p>
        <p>Api:</p>
        {apiText.map((user) => <p>{user.username}</p>)}
      </header>
    </div>
  );
}

export default App;
