
import ItemCount from "../ItemCount";


export default function Card({title, description, price, image, stock, onTotalize})
{
    const onAdd = (qty) => {            
        onTotalize(qty);
        alert(`Se agregaron ${qty}  productos`);
    } 

    return(
        <div className="card-item">
            <div className="card-item-title">{title}</div>
            <img  src={image}/>
            <div className="card-item-title">Precio: ${price}</div>
            <p className="card-item-description"> {description}</p>           
            <ItemCount stock={stock} initialValue={1} onAdd={onAdd} />
        </div>


    );

}