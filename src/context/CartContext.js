import { createContext, useState } from "react";

const CartContext = createContext([])


// proveedor
const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])
    //useState([{count:0, product:''}]) // [{count: cantidad, producto: registro del mock}]

    // Devuelve true si el producto que se quiere agregar ya esta en el cart
    const isInCart = (product) => {
        let exist = cartProducts.find(cartProduct => cartProduct.product.id === product.id)

        return exist
    }
    // agrega producto al carrito, si y solo si no esta en el cart
    const addProductToCart = (product, qty) => {
        let value = { count: qty, product: product }

        if (isInCart(product))
            alert('Ya agregaste este producto. Si quieres modificar la cantidad, entra al carrito.')
        else {
            setCartProducts(cartProducts => [...cartProducts, value]);
            alert('El producto fue agregado al carrito');
        }

    }
    // Elimina los productos cuyo id sean igual a el que viene como parametro
    const removeProductFromCart = (idProduct) => {
        setCartProducts(cartProducts.filter((prod) => { return prod.product.id !== idProduct }))
        console.log('luego del remove: ' + cartProducts)
    }
    // Remueve todos los items
    const clear = () => {
        setCartProducts([])
    }

    const data = {
        cartProducts,
        removeProductFromCart,
        addProductToCart,
        clear
    }

    return (
        <CartContext.Provider value={data}>
            {/* // componenetes adentro del provider, o sea los consuldores */}
            {children}
        </CartContext.Provider>
    )
}

// exportamos
export { CartProvider }
export default CartContext