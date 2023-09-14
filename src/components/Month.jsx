import React, { useEffect, useState } from "react";
import MonthTab from "./MonthTab";

const Month = ({ setMonth, rawData }) => {
  const [tabYear, setTabYear] = useState(2018);
  const [tabMonth, setTabMonth] = useState(8);
  const [activeTab, setActiveTab] = useState(0);
  const positionArray = [-1, 0, 1];

  // 判斷進位
  const calculateMonthNum = (position) => {
    if (position === -1) {
      return tabMonth > 1 ? tabMonth - 1 : 12;
    } else if (position === 1) {
      return tabMonth < 12 ? tabMonth + 1 : 1;
    }
    return tabMonth;
  };

  // 判斷進位
  const calculateYearNum = (position) => {
    if (position === -1) {
      return tabMonth > 1 ? tabYear : tabYear - 1;
    } else if (position === 1) {
      return tabMonth < 12 ? tabYear : tabYear + 1;
    }
    return tabYear;
  };

  // 組成字串
  const createMonthString = (position) => {
    if (position === 0) {
      return `${tabYear}/${tabMonth.toString().padStart(2, "0")}`;
    }
    return `${calculateYearNum(position)}/${calculateMonthNum(position)
      .toString()
      .padStart(2, "0")}`;
  };

  // 根據 activeTab 位置去 render 月份資料
  useEffect(() => {
    setMonth(createMonthString(activeTab));
  }, [activeTab, tabYear, tabMonth]);

  const handleClickPrevBtn = () => {
    if (activeTab !== -1) {
      setActiveTab(activeTab - 1);
    }
    if (activeTab === -1) {
      setTabMonth(calculateMonthNum(-1));
      setTabYear(calculateYearNum(-1));
    }
  };

  const handleClickNextBtn = () => {
    if (activeTab !== 1) {
      setActiveTab(activeTab + 1);
    }
    if (activeTab === 1) {
      setTabMonth(calculateMonthNum(1));
      setTabYear(calculateYearNum(1));
    }
  };

  // 判斷每月是否有產品 // pure function
  
  const checkProductExist = (positionArray) => {
    const newMonthArray = positionArray.map((position) =>
      createMonthString(position)
    );
    return newMonthArray.map((month) => {
      return rawData.some((item) => item.date.includes(month));
    });
  };

  const monthProductExist = checkProductExist(positionArray);

  return (
    <div className="month-wrapper">
      <div className="prev on" onClick={handleClickPrevBtn}></div>
      <ul className="tab-wrapper">
        {positionArray.map((item, index) => {
          return (
            <MonthTab
              isClicked={activeTab === item}
              setActiveTab={setActiveTab}
              position={item}
              yearNum={calculateYearNum(item)}
              monthNum={calculateMonthNum(item)}
              isDataExisted={monthProductExist[index]}
            />
          );
        })}
      </ul>
      <div className="next on" onClick={handleClickNextBtn}></div>
    </div>
  );
};

export default Month;
