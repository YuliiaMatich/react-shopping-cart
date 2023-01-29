import './ItemContainer.css';


const ItemContainer = (props) => {


  return (
   <div onClick={props.onClick} className='single-item-container'>
    <h5>{props.productName.length > 20 ? props.productName.slice(0, 20) + "..." : props.productName}</h5>
    <img className='single-item-image' src={props.image}></img>
    <div className="group-description-and-button">
    <p>{props.description.length > 50 ? props.description.slice(0, 50) + "..." : props.description}</p>
    </div>
   </div>
  )
  }
  
  export default ItemContainer;
