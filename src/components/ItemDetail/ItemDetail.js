import './ItemDetail.css';

const ItemDetail = ({selectedProduct}) => {

  const {title, description, price, size, color, stars, image, stock} = selectedProduct;

  // para dibujar las estrellas de la puntuacion
  const starItems = [];
  for (let index = 0; index < stars; index++) {
    starItems.push(<span key={index} className='star'></span>)   
  }

  return(
    <div className="container-cards">   
     <div className="selected-card-item">
            <div className="selected-card-item-title">{title}</div>
                <img  src={image}/> 
            <div className="selected-card-item-title">Precio: ${price}   </div>
            <ul className= 'selected-card-item-ul'>
                <li><span className="selected-card-item-description">Detalle del producto: {description}</span></li>
                <li><span className="selected-card-item-description">Talle: {size}</span></li>
                <li><span className="selected-card-item-description">Color: {color}</span></li>
                <li><span className="selected-card-item-description">Puntuación:</span> {starItems} </li>                         
                <li><span className="selected-card-item-description">Stock disponible: {stock}</span></li> 
            </ul>     
            <button className="addCart-btn" >Comprar</button>
        </div> 
    </div>     
       );   
 }
 
  export default  ItemDetail;