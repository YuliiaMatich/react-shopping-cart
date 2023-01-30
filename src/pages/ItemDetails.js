import "./ItemDetails.css";
import { Button } from 'react-bootstrap';

const ItemDetails = ( {singleItem} ) => {

// const denominationRange = (props, range) => {
// if (props.denominationType === "RANGE") {
// output = 
//     </select>
// }
// }


  return (
    <div className="main-item-details-container">
       <img className="item-details-image" src={singleItem.img}></img>
       <div className="item-details">
    <h1>{singleItem.productName}</h1>
    <hr className="hr1"/>
  <div className="group-denomination-and-quantity">
    {singleItem.denominationType === "FIXED"
            ? <div><label className="denominations" for="denominations">Denominations:&nbsp;&nbsp;</label>
    <select  name="denominations" id="denominations">
    {singleItem.fixedRecipientDenominations.map((value) => 
    (<option value={value}>{value}</option>))} </select> </div>: null}
    <p>Quantity &#40;1-20&#41;:&nbsp; <input type="number" min="1" max="20"></input></p>
    <Button variant="warning">Add to cart</Button>
    </div>
    <hr className="hr1"/>
    <div>{singleItem.description}</div>
    </div>
    </div>
  )
}

export default ItemDetails;

// {props.itemsList.map((singleItem) => (
//   <ItemContainer
//     key={singleItem.productId}
//     id={singleItem.productId}
//     productName={singleItem.productName}
//     image={singleItem.logoUrls[0]}
//     description={singleItem.description}
//     denominationType={singleItem.denominationType}
//     minRecipientDenomination={singleItem.minRecipientDenomination}
//     maxRecipientDenomination={singleItem.maxRecipientDenomination}
//     fixedSenderDenominations={singleItem.fixedSenderDenominations}
//     onClick={(event) => handleClick(event, singleItem)}
//   ></ItemContainer>