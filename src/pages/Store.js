import React from "react";
import "./Store.css";
import ItemDetails from "../components/ItemDetails";

const Store = (props) => {
  return (
    <div className='containers-list'>
          {props.itemsList.map((singleItem) => (
            <ItemDetails
              key={singleItem.productId}
              id={singleItem.productId}
              productName={singleItem.productName}
              image={singleItem.logoUrls[0]}
              description={singleItem.description}
            ></ItemDetails>
          ))}
    </div>
  );
};

export default Store;
