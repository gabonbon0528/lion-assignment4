import { useEffect, useState } from "react";
import "./App.scss";
import Dates from "./components/Dates";
import Month from "./components/Month";
import Week from "./components/Week";
import moment from "moment";

function App() {
  const [month, setMonth] = useState("2018/08");
  const [rawData, setRawData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [prevDays, setPreDays] = useState(0);
  const [days, setDays] = useState(30);

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

  useEffect(() => {
    let weekday = moment(`${month}/01`).format("dddd");

    switch (weekday) {
      case "Monday":
        setPreDays(1);
        break;
      case "Tuesday":
        setPreDays(2);
        break;
      case "Wednesday":
        setPreDays(3);
        break;
      case "Thursday":
        setPreDays(4);
        break;
      case "Friday":
        setPreDays(5);
        break;
      case "Saturday":
        setPreDays(6);
        break;
      case "Sunday":
        setPreDays(0);
        break;
      default:
        setPreDays(0);
    }

    const [yearNum, monthNum] = month.split("/").map(Number);
    switch (monthNum) {
      case 4:
      case 6:
      case 9:
      case 11:
        setDays(30);
        break;
      case 2:
        if ((yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0) {
          setDays(29);
        } else {
          setDays(28);
        }
        break;

      default:
        setDays(31);
        break;
    }
  }, [month]);

  return (
    <div className="calendar">
      <Month month={month} setMonth={setMonth} rawData={rawData} />
      <Week />
      <Dates
        selectData={selectData}
        month={month}
        prevDays={prevDays}
        days={days}
      />
    </div>
  );
}

export default App;
