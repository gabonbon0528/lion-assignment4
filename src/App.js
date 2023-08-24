import { useEffect, useState } from "react";
import "./App.scss";
import Dates from "./components/Dates";
import Month from "./components/Month";
import Week from "./components/Week";

function App() {
  const [month, setMonth] = useState("2018/08");
  const [rawData, setRawData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const handleFetchData = async () => {
    let response1 = fetch("./json/data1.json");
    let response2 = fetch("./json/data2.json");
    let response3 = fetch("./json/data3.json");
    let response4 = fetch("./json/data4.json");

    await Promise.all([response1, response2, response3, response4])
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((data) => {
        setRawData(data.flat());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    setSelectData(
      rawData.filter((item) => {
        return item.date.includes(month);
      })
    );

  }, [rawData, month]);

  return (
    <div className="calendars">
      <Month month={month} setMonth={setMonth}/>
      <Week />
      <Dates selectData={selectData} month={month} />
    </div>
  );
}

export default App;
