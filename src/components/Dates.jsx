import React, { useEffect, useState } from "react";
import Date from "./Date";
import Filling from "./Filling";

const Dates = ({ selectData, month, prevDays, days }) => {
  const [daysData, setDaysData] = useState([]);
  const [isClicked, setIsClicked] = useState('');

  useEffect(() => {
    const calendarArray = Array.from({ length: days }, (_, index) => {
      const day = index + 1;
      const dateString = `${month}/${day.toString().padStart(2, "0")}`;
      const dataForDay = selectData.filter((item) => item.date === dateString);
      return dataForDay;
    });

    const fillingArr = Array.from({ length: prevDays }, () => null);
    let totalArray = [...fillingArr, ...calendarArray];
    setDaysData(totalArray);
  }, [month, days, selectData]);

  function handleClick(e) {
    setIsClicked(e.currentTarget.id);
  }

  return (
    <ul className="dates-wrapper">
      {daysData.map((item, index) =>
        item ? (
          <Date
            key={index}
            item={item}
            date={index - prevDays + 1}
            isClicked={isClicked}
            handleClick={handleClick}
            month={month}
          />
        ) : (
          <Filling key={index} />
        )
      )}
    </ul>
  );
};

export default Dates;
