import "./ItemContainer.css";

const ItemContainer = (props) => {
  const fixedDenominations = function (array) {
    // let result = "";
    // for (let i = 0; i < array.length; i++) {
    //   result = result + array[i] + "$, ";
    //     }
    //     return result.slice(0, -2);
    let result = "";
    if (array.length === 1) {
      result = "Denomination: " + array[0] + "$";
    }
  if (array.length > 1) {
    result = "Denominations: " + array[0] + "$ - " + array[array.length -1] + "$";
  }
      return result;
  };

  return (
    <div onClick={props.onClick} className="single-item-container">
      <h5>
        {props.productName.length > 20
          ? props.productName.slice(0, 20) + "..."
          : props.productName}
      </h5>
      <img className="single-item-image" src={props.image}></img>
      <div className="group-description-and-denomination">
        <p>
          {props.description.length > 50
            ? props.description.slice(0, 50) + "..."
            : props.description}
        </p>
        <p> 
          {props.denominationType === "RANGE"
            ? "Denominations: " + props.minRecipientDenomination +
              "$ - " +
              props.maxRecipientDenomination +
              "$"
            : null}
          {props.denominationType === "FIXED"
            ? fixedDenominations(props.fixedSenderDenominations)
            : null}
        </p>
      </div>
    </div>
  );
};

export default ItemContainer;
