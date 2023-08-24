import React, { useEffect, useState } from "react";
import Date from "./Date";
import moment from "moment";
import Filling from "./Filling";

const Dates = ({ selectData, month }) => {
  const [prevDays, setPreDays] = useState(0);
  const [Days, setDays] = useState(31);
  const [daysData, setDaysData] = useState([]);
  const [isClicked, setIsClicked] = useState(-1);

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
      case 2:
        if ((yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0) {
          setDays(29);
        } else {
          setDays(28);
        }
      default:
        setDays(31);
    }
  }, []);

  useEffect(() => {
    let newArr = selectData.map((item, index) => {
      return { ...item, id: index };
    });
    // console.log(newArr);

    const calendarArray = Array.from({ length: Days }, (_, index) => {
      const day = index + 1;
      const dateString = `${month}/${day.toString().padStart(2, "0")}`;
      const dataForDay = newArr.filter((item) => item.date === dateString);
      return dataForDay;
    });
    setDaysData(calendarArray);
    // console.log(calendarArray);
  }, [Days, selectData]);

  function handleClick(e) {
    setIsClicked(e.currentTarget.id)
  }


  return (
    <ul className="dates-wrapper">
      {Array.from({ length: prevDays }, (_, index) => (
        <Filling key={index} />
      ))}
      {daysData.map((item, index) => (
        <Date
          key={index}
          item={item}
          index={index}
          isClicked={isClicked}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default Dates;
