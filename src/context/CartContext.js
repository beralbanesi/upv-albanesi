import { createContext, useState } from "react";

const CartContext = createContext([])


// proveedor
const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])


    // Devuelve true si el producto que se quiere agregar ya esta en el cart
    const isInCart = (id) => {
        return cartProducts.some(prod => prod.product.id == id)
    }
    // agrega producto al carrito, si y solo si no esta en el cart. Si esta, actualizada su cantidad
    const addProductToCart = (product, qty) => {
        let value = { count: qty, product: product }
        //console.log('id:' + product.id + 'fcion:' + isInCart(product.id));
        if (isInCart(product.id)) {
            let obj = cartProducts.find((item) => item.product.id == product.id);
            //console.log('antes obj:' + obj.product.id + 'coiunt' + obj.count);
            obj.count += qty;
            //console.log('despues obj:' + obj.product.id + 'coiunt' + obj.count);
            let newArray = cartProducts.filter((item) => item.product.id !== product.id);
            // console.log('newarray' + newArray.length)
            setCartProducts(newArray);
            //console.log('.....' + cartProducts[1].product.id);
            setCartProducts(cartProducts => [...cartProducts, obj]);
            //console.log('FIN.....' + cartProducts.length);
        }
        else {
            setCartProducts(cartProducts => [...cartProducts, value]);
        }
    } 

    // Elimina los productos cuyo id sean igual a el que viene como parametro
    const removeProductFromCart = (idProduct) => {
        setCartProducts(cartProducts.filter((prod) => { return prod.product.id !== idProduct }))
    }
    // Remueve todos los items
    const clear = () => {
        const prods = []
        setCartProducts(prods)
    }
    // calcula la cant total de productos
    const amount = () => {
        return cartProducts.reduce((total, prod) => total + prod.count, 0);
    }
    // calcula el precio total
    const totalPrice = () => {
        return cartProducts.reduce((total, prod) => total + (prod.product.price * prod.count), 0)
    }
 
    // setea la cantidad q viene en parametro al prod en cuestion
    const updateCount = (id, qty) => {
        let obj = cartProducts.find((item) => item.product.id == id);
        obj.count = qty;
        let newArray = cartProducts.filter((item) => item.product.id !== id);
        setCartProducts(newArray);
        setCartProducts(cartProducts => [...cartProducts, obj]);
    }

    // actualiza stock de los productos que vienen en la orden de compra
    const updateCartContextStock = (order) => {
        const newList = order.items.map((item) => {
            let obj = cartProducts.find((prod) => prod.product.id == item.id);
            obj.product.stock -= item.count;
            return obj;
        });
        setCartProducts(newList);

    }

    const data = {
        cartProducts,
        removeProductFromCart,
        addProductToCart,
        updateCount,
        clear,
        amount,
        totalPrice,
        updateCartContextStock

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