
import ItemCount from "../ItemCount/ItemCount";

export default function Item({productData, onTotalize, onSelectItem})
{

    const onAdd = (qty) => {            
        onTotalize(qty);
        alert(`Se agregaron ${qty}  productos`);
    }
    const onClickDetail = () => {
        onSelectItem(productData.id);
        console.log(productData);
    }

    const {id, title, description, price, image, stock} = productData;
    return(
       
        <div className="card-item">
            <img  src={image}/>
            <div className="card-item-title">{title}</div>
            <div>Precio: ${price}</div>
            <button className="detail-btn" onClick={onClickDetail}>Mostrar detalle</button>
            <ItemCount stock={stock} initialValue={1} onAdd={onAdd} />
        </div>


    );

}