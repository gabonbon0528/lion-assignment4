import { useEffect, useState } from "react";
import "./App.scss";
import Table from "./components/Table";
import Month from "./components/Month";
import Week from "./components/Week";

function App() {
  const [month, setMonth] = useState("2018/08");
  const [rawData, setRawData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const handleFetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch("./json/data1.json"),
        fetch("./json/data2.json"),
        fetch("./json/data3.json"),
        fetch("./json/data4.json"),
      ]);

      const data = await Promise.all(responses.map((r) => r.json()));

      const modifiedData = data.flatMap((item, index) =>
        index === 1 ? changeKey(item) : item
      );

      setRawData(modifiedData);
    } catch (err) {
      console.log(err);
    }
  };

  function changeKey(data) {
    return data.map((item) => {
      return {
        date: item.date,
        price: item.price,
        guaranteed: item.certain,
        availableVancancy: item.onsell,
        totalVacnacy: item.total,
        status: item.state,
      };
    });
  }

  useEffect(() => {
    handleFetchData();
  }, []);

  const FilterMonthData = () => {
    setSelectData(
      rawData.filter((item) => {
        return item.date.includes(month);
      })
    );
  };

  useEffect(() => {
    FilterMonthData();
  }, [rawData, month]);


  return (
    <div className="calendar">
      <Month month={month} setMonth={setMonth} rawData={rawData} />
      <Week />
      <Table
        selectData={selectData}
        month={month}
      />
    </div>
  );
}

export default App;
