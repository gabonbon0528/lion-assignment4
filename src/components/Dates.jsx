import React from "react";

const Dates = () => {
  return (
    <ul className="dates-wrapper">
      <li className="date disabled"></li>
      <li className="date has-data">
        <span className="num fb-50per item">1</span>
        <span className="tag fb-50per item">成團</span>
        <span className="status fb-100per item color-green">候補</span>
        <span className="sell fb-100per item">可賣：0</span>
        <span className="group fb-100per item">團位：0</span>
        <span className="tip fb-100per item">
          <i className="ic-ln productreferf item"></i>保證出團
        </span>
        <span className="price fb-100per">$4,999</span>
      </li>
    </ul>
  );
};

export default Dates;
