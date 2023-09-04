import React from "react";

const MonthTab = ({
  isClicked,
  setActiveTab,
  yearNum,
  monthNum,
  rawData,
  monthStr,
  position,
}) => {
  return (
    <li
      className={`tab ${isClicked ? "clicked" : ""}`}
      onClick={() => setActiveTab(position)}
    >
      <span className="fb-100per">
        {yearNum}年{monthNum}月
      </span>
      {!rawData.find((item) => {
        return item.date.includes(monthStr(position));
      }) && <span className="desc">無出發日</span>}
    </li>
  );
};

export default MonthTab;
