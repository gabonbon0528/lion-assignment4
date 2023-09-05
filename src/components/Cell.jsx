import React from "react";
import SeeMore from "./SeeMore";

const Cell = ({ item, date, isClicked, handleClick, month }) => {

  return (
    <li
      className={`date has-data ${
        isClicked === `${month}/${date}` ? "clicked" : ""
      }`}
      id={`${month}/${date}`}
      onClick={handleClick} // no (e) => handleClick(e) 
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
              item[0].status === ("報名" || "後補" || "預定")
                ? "color-green"
                : "color-orange"
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
      {item.length > 1 && <SeeMore item={item}/>}
    </li>
  );
};

export default Cell;
