import React, { useEffect, useState } from "react";
import MonthTab from "./MonthTab";

const Month = ({ setMonth, rawData }) => {
  const [tabYear, setTabYear] = useState(2018);
  const [tabMonth, setTabMonth] = useState(8);
  const [activeTab, setActiveTab] = useState(0);

  const calculateMonthNum = (position) => {
    if (position == -1) {
      return tabMonth > 1 ? tabMonth - 1 : 12;
    } else if (position == 1) {
      return tabMonth < 12 ? tabMonth + 1 : 1;
    }
    return tabMonth;
  };

  const calculateYearNum = (position) => {
    if (position == -1) {
      return tabMonth > 1 ? tabYear : tabYear - 1;
    } else if (position == 1) {
      return tabMonth < 12 ? tabYear : tabYear + 1;
    }
    return tabYear;
  };

  const monthStr = (position) => {
    if (position == 0) {
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
    if (activeTab == -1) {
      setTabMonth(calculateMonthNum(-1));
      setTabYear(calculateYearNum(-1));
    }
  };

  const handleClickNextvBtn = () => {
    if (activeTab !== 1) {
      setActiveTab(activeTab + 1);
    }
    if (activeTab == 1) {
      setTabMonth(calculateMonthNum(1));
      setTabYear(calculateYearNum(1));
    }
  };

  const commonProps = {
    activeTab,
    setActiveTab,
    calculateYearNum,
    calculateMonthNum,
    rawData,
    monthStr,
  };

  return (
    <div className="month-wrapper">
      <div className="prev on" onClick={handleClickPrevBtn}></div>
      <ul className="tab-wrapper">
        <MonthTab {...commonProps} position={-1} />
        <MonthTab {...commonProps} position={0} />
        <MonthTab {...commonProps} position={1} />
      </ul>
      <div className="next on" onClick={handleClickNextvBtn}></div>
    </div>
  );
};

export default Month;
