import ItemCount from "../ItemCount/ItemCount";
import './Item.css';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import CartContext from "../../context/CartContext";

export default function Item({productData})
{
    const {addProductToCart} = useContext(CartContext);
    const onAdd = (qty) => {
        addProductToCart(productData, qty);      
    }
   
    const {id, title, price, image, stock} = productData;
    
    return(
      
       
        <div className="card-item">
            <img className="card-item-img" alt='Imagen de producto' src={`../img/${image}`}/>
            <div className="card-item-title">{title}</div>
            <div className="card-item-price">Precio: ${price}</div>
            <Link to={`/productos/${id}`} className="detail-btn" >VER DETALLE</Link>
            <ItemCount stock={stock} initialValue={1} onAdd={onAdd} />
        </div>
    );

}