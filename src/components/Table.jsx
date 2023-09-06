import Cell from "./Cell";

const Table = ({ selectData, month, clickedDate, setClickedDate }) => {
  const [yearNum, monthNum] = month.split("/").map(Number);
  const weekdayOfFirstDay = new Date(yearNum, monthNum - 1, 1).getDay();
  const numberOfSpaces = weekdayOfFirstDay;
  const lastDay = new Date(yearNum, monthNum, 0).getDate();

  const createDaysArray = () => {
    const calendarArray = Array.from({ length: lastDay }, (_, index) => {
      const day = index + 1;
      const dateString = `${month}/${day.toString().padStart(2, "0")}`;
      const dataForDay = selectData.filter((item) => item.date === dateString);
      return dataForDay;
    });

    const fillingArray = Array.from({ length: numberOfSpaces }, () => null);
    let totalArray = [...fillingArray, ...calendarArray];
    return totalArray;
  };

  const daysArray = createDaysArray();

  return (
    <ul className="dates-wrapper">
      {daysArray.map((item, index) => {
        const date = index - numberOfSpaces + 1;
        return item ? (
          <Cell
            key={index}
            item={item}
            date={date}
            isClicked={clickedDate === `${month}/${date}`}
            handleClick={() =>
              setClickedDate(`${month}/${date}`)
            }
            month={month}
          />
        ) : (
          <li className="date disabled"></li>
        );
      })}
    </ul>
  );
};

export default Table;
