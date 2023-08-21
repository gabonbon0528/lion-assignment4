import { useEffect } from "react";
import "./App.scss";
import Dates from "./components/Dates";
import Month from "./components/Month";
import Week from "./components/Week";

function App() {
  useEffect(() => {
    fetch('./json.data1.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      }).catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <div className="calendars">
      <Month />
      <Week />
      <Dates />
    </div>
  );
}

export default App;
