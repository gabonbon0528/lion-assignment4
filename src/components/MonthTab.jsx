import React from "react";

const MonthTab = ({
  activeTab,
  setActiveTab,
  calculateYearNum,
  calculateMonthNum,
  rawData,
  monthStr,
  position,
}) => {
  return (
    <li
      className={`tab ${activeTab == position ? "clicked" : ""}`}
      onClick={() => setActiveTab(position)}
    >
      <span className="fb-100per">
        {calculateYearNum(position)}年{calculateMonthNum(position)}
        月
      </span>
      {!rawData.find((item) => {
        return item.date.includes(monthStr(position));
      }) && <span className="desc">無出發日</span>}
    </li>
  );
};

export default MonthTab;
