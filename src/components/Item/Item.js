import ItemCount from "../ItemCount/ItemCount";
import './Item.css';
import {Link} from 'react-router-dom';
export default function Item({productData})
{
    const onAdd = (qty) => {
        alert(`Se agregaron ${qty}  productos`);
    }
   
    const {id, title, price, image, stock} = productData;
    return(
       
        <div className="card-item">
            <img className="card-item-img" src={image}/>
            <div className="card-item-title">{title}</div>
            <div className="card-item-price">Precio: ${price}</div>
            <Link to={`/productos/${id}`} className="detail-btn" >Mostrar detalle</Link>
            <ItemCount stock={stock} initialValue={1} onAdd={onAdd} />
        </div>
    );

}