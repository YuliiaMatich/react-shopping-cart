import React from "react";
import "./Store.css";
import ItemContainer from "../components/ItemContainer";
import { useNavigate } from "react-router-dom"; 



const Store = (props) => {

  const navigate = useNavigate();

  const handleClick = (event,singleItem) => {
    event.preventDefault();
   props.setSingleItem(singleItem)
    navigate(`/products/${singleItem.productId}`);
  }

  return (
    <div className='containers-list'>
          {props.itemsList.map((singleItem) => (
            <ItemContainer
              key={singleItem.productId}
              id={singleItem.productId}
              productName={singleItem.productName}
              image={singleItem.logoUrls[0]}
              description={singleItem.description}
              onClick={(event) => handleClick(event, singleItem)}
            ></ItemContainer>
          ))}
    </div>
  );
};

export default Store;
