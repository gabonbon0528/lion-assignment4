import React from "react";

const MonthTab = ({
  isClicked,
  setActiveTab,
  position,
  yearNum,
  monthNum,
  isDataExisted,
}) => {
  return (
    <li
      className={`tab ${isClicked ? "clicked" : ""}`}
      onClick={() => setActiveTab(position)}
    >
      <span className="fb-100per">
        {yearNum}年{monthNum}月
      </span>
      {!isDataExisted && <span className="desc">無出發日</span>}
    </li>
  );
};

export default MonthTab;
