import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import Filling from "./Filling";

const Table = ({ selectData, month, days }) => {
  const [daysData, setDaysData] = useState([]);
  const [isClicked, setIsClicked] = useState("");

  const [yearNum, monthNum] = month.split("/").map(Number);

  const weekdayOfFirstDay = new Date(yearNum, monthNum - 1, 1).getDay();
  let numberOfSpaces = weekdayOfFirstDay;

  const lastDay = new Date(yearNum, monthNum, 0).getDate();

  useEffect(() => {
    // 用成物件？？？
    const calendarArray = Array.from({ length: lastDay }, (_, index) => {
      const day = index + 1;
      const dateString = `${month}/${day.toString().padStart(2, "0")}`;
      const dataForDay = selectData.filter((item) => item.date === dateString);
      return dataForDay;
    });

    const fillingArr = Array.from({ length: numberOfSpaces }, () => null);
    let totalArray = [...fillingArr, ...calendarArray];
    setDaysData(totalArray);
  }, [month, selectData]);

  function handleClick(e) {
    setIsClicked(e.currentTarget.id);
  }

  return (
    <ul className="dates-wrapper">
      {daysData.map((item, index) =>
        item ? (
          <Cell
            key={index}
            item={item}
            date={index - numberOfSpaces + 1}
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

export default Table;
