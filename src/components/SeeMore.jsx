import React, { useEffect, useState } from "react";

const SeeMore = ({ date, item }) => {
  const[lowestPrice, setLowestPrice] = useState(0);

  useEffect(() => {
    let lowestPrice = item[0].price;
    for (let i = 0; i < item.length; i++) {
      if(item[i].price <= lowestPrice){
        lowestPrice = item[i].price;
      }
    }
    setLowestPrice(lowestPrice);

  }, []);

  return (
    <>
      <div className="see-more">
        <div className="color-blue">看更多產品</div>
        <span className="price">${lowestPrice}</span>
        <span>起</span>
      </div>
    </>
  );
};

export default SeeMore;
