import React, { useEffect, useState } from "react";
import Date from "./Date";
import moment from "moment";

const Dates = ({ selectData, month }) => {
  const [firstDay, setFirstDay] = useState(0);

  useEffect(() => {
    let weekday = moment(`${month}/01`).format("dddd");
    console.log("weekday", weekday);

    switch (weekday) {
      case "Monday":
        setFirstDay(1);
        break;
      case "Tuesday":
        setFirstDay(2);
        break;
      case "Wednesday":
        setFirstDay(3);
        break;
      case "Thursday":
        setFirstDay(4);
        break;
      case "Friday":
        setFirstDay(5);
        break;
      case "Saturday":
        setFirstDay(6);
        break;
      case "Sunday":
        setFirstDay(7);
        break;
      default:
        setFirstDay(0);
    }
  }, []);

  return (
    <ul className="dates-wrapper">
      {/* <li className="date disabled"></li> */}
      {Array.from({ length: firstDay }, (_, index) => (
        <li key={index} className="date disabled"></li>
      ))}
      <Date />
    </ul>
  );
};

export default Dates;
