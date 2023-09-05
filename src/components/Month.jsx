import React, { useEffect, useState } from "react";
import MonthTab from "./MonthTab";

const Month = ({ setMonth, rawData }) => {
  const [tabYear, setTabYear] = useState(2018);
  const [tabMonth, setTabMonth] = useState(8);
  const [activeTab, setActiveTab] = useState(0);

  const calculateMonthNum = (position) => {
    if (position === -1) {
      return tabMonth > 1 ? tabMonth - 1 : 12;
    } else if (position === 1) {
      return tabMonth < 12 ? tabMonth + 1 : 1;
    }
    return tabMonth;
  };

  const calculateYearNum = (position) => {
    if (position === -1) {
      return tabMonth > 1 ? tabYear : tabYear - 1;
    } else if (position === 1) {
      return tabMonth < 12 ? tabYear : tabYear + 1;
    }
    return tabYear;
  };

  const monthStr = (position) => {
    if (position === 0) {
      return `${tabYear}/${tabMonth.toString().padStart(2, "0")}`;
    }
    return `${calculateYearNum(position)}/${calculateMonthNum(position)
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (activeTab === -1) {
      setMonth(monthStr(-1));
    } else if (activeTab === 1) {
      setMonth(monthStr(1));
    } else {
      setMonth(monthStr(0));
    }
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

  const handleClickNextvBtn = () => {
    if (activeTab !== 1) {
      setActiveTab(activeTab + 1);
    }
    if (activeTab === 1) {
      setTabMonth(calculateMonthNum(1));
      setTabYear(calculateYearNum(1));
    }
  };

  const monthsToCheck = [-1, 0, 1];

  // const getMonthData = (positionArr) => {
  //   let monthData = {};

  //   const newMonth = positionArr.map((po) => monthStr(po));
  //   // console.log(newMonth);
  //   rawData.forEach((item) => {
  //     if (item.date.includes(newMonth[0])) {
  //       monthData[newMonth[0]] = true;
  //     } else if (item.date.includes(newMonth[1])) {
  //       monthData[newMonth[1]] = true;
  //     } else if (item.date.includes(newMonth[2])) {
  //       monthData[newMonth[2]] = true;
  //     }
  //   });
  //   console.log(monthData);
  // };

  // getMonthData(monthsToCheck);

  let monthData = {};

  const getMonthData = (positionArr) => {
    monthData = positionArr.reduce((result, po) => {
      const month = monthStr(po);
      rawData.forEach((item) => {
        if (item.date.includes(month)) {
          result[month] = true;
        }
      });
      return result;
    }, {});

    console.log(monthData);
  };

  getMonthData(monthsToCheck);
  console.log(monthData["2018/07"])

  return (
    <div className="month-wrapper">
      <div className="prev on" onClick={handleClickPrevBtn}></div>
      <ul className="tab-wrapper">
        <MonthTab
          isClicked={activeTab === -1}
          setActiveTab={setActiveTab}
          position={-1}
          yearNum={calculateYearNum(-1)}
          monthNum={calculateMonthNum(-1)}
          isDataExisted={monthData["2018/07"]}
        />
        <MonthTab
          isClicked={activeTab === 0}
          setActiveTab={setActiveTab}
          position={0}
          yearNum={calculateYearNum(0)}
          monthNum={calculateMonthNum(0)}
          isDataExisted={monthData[0]}
        />
        <MonthTab
          isClicked={activeTab === 1}
          setActiveTab={setActiveTab}
          position={1}
          yearNum={calculateYearNum(1)}
          monthNum={calculateMonthNum(1)}
          isDataExisted={monthData[1]}
        />
      </ul>
      <div className="next on" onClick={handleClickNextvBtn}></div>
    </div>
  );
};

export default Month;
