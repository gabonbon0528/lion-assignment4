import React from "react";

const Month = () => {
  return (
    <div className="month-wrapper">
      <div className="prev on"></div>
      <ul className="tab-wrapper">
        <li className="tab">
          <span>2017 7月</span>
        </li>
        <li className="tab">
          <span>2017 8月</span>
        </li>
        <li className="tab">
          <span>2017 9月</span>
        </li>
      </ul>
      <div className="next on"></div>
    </div>
  );
};

export default Month;
