
import ItemCount from "../ItemCount/ItemCount";
import Detail from "../Detail/Detail";


export default function Item({productData, onTotalize})
{
    const onAdd = (qty) => {            
        onTotalize(qty);
        alert(`Se agregaron ${qty}  productos`);
    }

    const {title, description, price, image, stock} = productData;
    return(
       
        <div className="card-item">
            <div className="card-item-title">{title}</div>
            <img  src={image}/>
            <div className="card-item-title">Precio: ${price}</div>
            <p className="card-item-description"> {description}</p> 
            <Detail/>                   
            <ItemCount stock={stock} initialValue={1} onAdd={onAdd} />
        </div>


    );

}