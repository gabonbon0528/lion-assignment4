import React, { useEffect, useState } from "react";

const Month = ({ month, setMonth, rawData }) => {
  const [yearNum, setYearNum] = useState(2018);
  const [monthNum, setMonthNum] = useState(8);
  const [activeTab, setActiveTab] = useState(0);
  const [preMonthData, setPreMonthData] = useState([]);
  const [nextMonthData, setNextMonthData] = useState([]);
  const [middleMonthData, setMiddleMonthData] = useState([]);

  const calculateAdjacentMonthNum = (position) => {
    if (position == "prev") {
      return monthNum > 1 ? monthNum - 1 : 12;
    } else if (position == "next") {
      return monthNum < 12 ? monthNum + 1 : 1;
    }
  };

  const calculateAdjacentYearNum = (position) => {
    if (position == "prev") {
      return monthNum > 1 ? yearNum : yearNum - 1;
    } else if (position == "next") {
      return monthNum < 12 ? yearNum : yearNum + 1;
    }
  };

  useEffect(() => {
    setPreMonthData(
      rawData.filter((item) => {
        return item.date.includes(
          `${calculateAdjacentYearNum("prev")}/${calculateAdjacentMonthNum(
            "prev"
          )
            .toString()
            .padStart(2, "0")}`
        );
      })
    );

    setNextMonthData(
      rawData.filter((item) => {
        return item.date.includes(
          `${calculateAdjacentYearNum("next")}/${calculateAdjacentMonthNum(
            "next"
          )
            .toString()
            .padStart(2, "0")}`
        );
      })
    );

    setMiddleMonthData(
      rawData.filter((item) => {
        return item.date.includes(
          `${yearNum}/${monthNum.toString().padStart(2, "0")}`
        );
      })
    );
  }, [monthNum, rawData]);

  useEffect(() => {
    let newMonthNum = monthNum;
    let newYearNum = yearNum;

    if (activeTab === -1) {
      newMonthNum = monthNum > 1 ? monthNum - 1 : 12;
      newYearNum = monthNum > 1 ? yearNum : yearNum - 1;
    } else if (activeTab === 1) {
      newMonthNum = monthNum < 12 ? monthNum + 1 : 1;
      newYearNum = monthNum < 12 ? yearNum : yearNum + 1;
    }

    const monthStr = `${newYearNum}/${newMonthNum.toString().padStart(2, "0")}`;
    setMonth(monthStr);
  }, [activeTab, yearNum, monthNum]);

  const handleClickPrevBtn = () => {
    if (activeTab !== -1) {
      setActiveTab(activeTab - 1);
    }
    if (activeTab == -1) {
      setMonthNum(calculateAdjacentMonthNum('prev'));
      setYearNum(calculateAdjacentYearNum('prev'));
    }
  };

  const handleClickNextvBtn = () => {
    if (activeTab !== 1) {
      setActiveTab(activeTab + 1);
    }
    if (activeTab == 1) {
      setMonthNum(calculateAdjacentMonthNum('next'));
      setYearNum(calculateAdjacentYearNum('next'));
    }
  };

  return (
    <div className="month-wrapper">
      <div className="prev on" onClick={handleClickPrevBtn}></div>
      <ul className="tab-wrapper">
        <li
          className={`tab ${activeTab == -1 && "clicked"}`}
          onClick={() => setActiveTab(-1)}
        >
          <span className="fb-100per">
            {calculateAdjacentYearNum('prev')}年
            {calculateAdjacentMonthNum('prev')}月
          </span>
          {!preMonthData.length && <span className="desc">無出發日</span>}
        </li>
        <li
          className={`tab ${activeTab == 0 && "clicked"}`}
          onClick={() => setActiveTab(0)}
        >
          <span className="fb-100per">
            {yearNum}年{monthNum}月
          </span>
          {!middleMonthData.length && <span className="desc">無出發日</span>}
        </li>
        <li
          className={`tab ${activeTab == 1 && "clicked"}`}
          onClick={() => setActiveTab(1)}
        >
          <span className="fb-100per">
            {calculateAdjacentYearNum('next')}年
            {calculateAdjacentMonthNum('next')}月
          </span>
          {!nextMonthData.length && <span className="desc">無出發日</span>}
        </li>
      </ul>
      <div className="next on" onClick={handleClickNextvBtn}></div>
    </div>
  );
};

export default Month;
