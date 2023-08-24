import React, { useEffect, useState } from "react";

const Month = ({ month, setMonth }) => {
  const [yearNum, setYearNum] = useState(2018);
  const [monthNum, setMonthNum] = useState(8);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // const [yearNum, monthNum] = month.split("/").map(Number);
    // setYearNum(yearNum);
    // setMonthNum(monthNum);
  }, []);

  const handleClickPrevBtn = () => {
    if (activeTab !== -1) {
      setActiveTab(activeTab - 1);
    }
    if (activeTab == -1) {
      const newMonthNum = (monthNum > 1 ? monthNum - 1 : 12)
      const newYearNum = monthNum > 1 ? yearNum : yearNum - 1;

      setMonthNum(newMonthNum);
      setYearNum(newYearNum);
    }
  };
  
  function switchDate(){
    // document.querySelector('.tab.clicked').innerHTML
  }

  const handleClickNextvBtn = () => {
    if (activeTab !== 1) {
      setActiveTab(activeTab + 1);
    }
    if (activeTab == 1) {
      setMonthNum(monthNum + 1);
      const newMonthNum = (monthNum < 12 ? monthNum + 1 : 1)
      const newYearNum = monthNum < 12 ? yearNum : yearNum + 1;

      setMonthNum(newMonthNum);
      setYearNum(newYearNum);
    }
  };

  const handleClickTab = (e) => {};

  return (
    <div className="month-wrapper">
      <div className="prev on" onClick={handleClickPrevBtn}></div>
      <ul className="tab-wrapper">
        <li
          className={`tab ${activeTab == -1 && "clicked"}`}
          onClick={(e) => {
            handleClickTab(e);
            setActiveTab(-1);
          }}
        >
          <span>
            {monthNum > 1 ? yearNum : yearNum - 1}年{" "}
            {monthNum > 1 ? monthNum - 1 : 12}月
          </span>
        </li>
        <li
          className={`tab ${activeTab == 0 && "clicked"}`}
          onClick={(e) => {
            handleClickTab(e);
            setActiveTab(0);
          }}
        >
          <span>
            {yearNum}年 {monthNum}月
          </span>
        </li>
        <li
          className={`tab ${activeTab == 1 && "clicked"}`}
          onClick={(e) => {
            handleClickTab(e);
            setActiveTab(1);
          }}
        >
          <span>
            {monthNum < 12 ? yearNum : yearNum + 1}年{" "}
            {monthNum < 12 ? monthNum + 1 : 1}月
          </span>
        </li>
      </ul>
      <div className="next on" onClick={handleClickNextvBtn}></div>
    </div>
  );
};

export default Month;
