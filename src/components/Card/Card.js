import CartWidget from "../CartWidget";


export default function Card({title, description, price, image})
{
    return(
        <div className="card-item">
            <h2>{title}</h2>
            <img  src={image}/>
            <h2>Precio: {price}</h2>
            <p> {description}</p>
            <button> Comprar </button>
        </div>


    );

}