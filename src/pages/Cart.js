import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from "../context/CartContext";
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {

    const { cartProducts } = useContext(CartContext);
    const navigate = useNavigate();

    console.log('dentro de cartpage' + cartProducts)
    return (
        <>
            <h1>Carrito de compras:</h1>
            {cartProducts?.map((cartProduct, i) => {
                return <input key={i} disabled placeholder={cartProduct.product.title} />

            })
            }

            {(cartProducts.length > 0) ? <button className="continue-btn" onClick={() => { navigate(`/pay`) }} >Continuar compra</button>
                : <p>Carrito Vacio</p>
            }

        </>
    )

}

export default CartPage;