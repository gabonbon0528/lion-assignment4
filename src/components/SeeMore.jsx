const SeeMore = ({ item }) => {
  
  let lowestPrice = item[0].price;
  const getLowestPrice = () => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].price <= lowestPrice) {
        lowestPrice = item[i].price;
      }
    }
    return lowestPrice;
  };

  return (
    <>
      <div className="see-more fb-100per">
        <div className="color-blue">看更多產品</div>
        <span className="price">${getLowestPrice()}</span>
        <span>起</span>
      </div>
    </>
  );
};

export default SeeMore;
