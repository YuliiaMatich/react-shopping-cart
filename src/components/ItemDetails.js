import './ItemDetails.css';


const ItemDetails = (props) => {
  return (
   <div className='single-item-container'>
    <h5>{props.productName.length > 20 ? props.productName.slice(0, 20) + "..." : props.productName}</h5>
    <img className='single-item-image' src={props.image}></img>
    <div className="group-description-and-button">
    <p>{props.description.length > 50 ? props.description.slice(0, 50) + "..." : props.description}</p>
    </div>
   </div>
  )
  }
  
  export default ItemDetails;
