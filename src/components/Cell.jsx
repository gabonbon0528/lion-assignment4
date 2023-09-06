import React from "react";
import { statusOptions } from "../constants/constants";

const Cell = ({ item, date, isClicked, handleClick }) => {

  const getLowestPrice = () => {
    let lowestPrice = item[0]?.price;
    for (let i = 0; i < item.length; i++) {
      if (item[i].price <= lowestPrice) {
        lowestPrice = item[i].price;
      }
    }
    return lowestPrice;
  };

  return (
    <li
      className={`date has-data ${
        isClicked ? "clicked" : ""
      }`}
      onClick={handleClick} // no need (e) => handleClick(e)
    >
      <span className="num fb-50per item">{date}</span>
      {item.length === 1 && (
        <>
          <span
            className={`tag fb-50per item ${
              item[0].guaranteed ? "show-tag" : ""
            }`}
          >
            成團
          </span>
          <span
            className={`status fb-100per item ${
              statusOptions[item[0].status] || statusOptions.default
            }`}
          >
            {item[0].status}
          </span>
          <span className="sell fb-100per item">
            可賣：{item[0].availableVancancy}
          </span>
          <span className="group fb-100per item">
            席次：{item[0].totalVacnacy}
          </span>
          <span className="price fb-100per">${item[0].price}</span>
        </>
      )}
      {item.length > 1 && (
        <>
          <div className="see-more fb-100per">
            <div className="color-blue">看更多產品</div>
            <span className="price">${getLowestPrice()}</span>
            <span>起</span>
          </div>
        </>
      )}
    </li>
  );
};

export default Cell;
