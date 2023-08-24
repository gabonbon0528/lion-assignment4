import React from "react";
import { useEffect, useState } from "react";
import SeeMore from "./SeeMore";

const Date = ({ item, index, isClicked, handleClick }) => {
  let itemLength = item.length;

  return (
    <li
      className={`date has-data ${isClicked == index && "clicked"}`}
      id={index}
      onClick={(e) => handleClick(e)}
    >
      {itemLength === 0 && (
        <span className="num fb-50per item">{index + 1}</span>
      )}
      {itemLength === 1 && (
        <>
          <span className="num fb-50per item">{index + 1}</span>
          <span
            className={`tag fb-50per item ${
              (item[0].guaranteed || item[0].certain) && "show-tag"
            }`}
          >
            成團
          </span>
          <span
            className={`status fb-100per item ${
              (item[0].state || item[0].status) === ("報名" || "後補" || "預定")
                ? "color-green"
                : "color-orange"
            }`}
          >
            {item[0].state || item[0].status}
          </span>
          <span className="sell fb-100per item">
            可賣：{item[0].onsell || item[0].availableVancancy}
          </span>
          <span className="group fb-100per item">
            席次：{item[0].total || item[0].totalVacnacy}
          </span>
          <span className="price fb-100per">${item[0].price}</span>
        </>
      )}
      {itemLength > 1 && <SeeMore index={index} item={item}/>}
    </li>
  );
};

export default Date;
