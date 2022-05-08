import { createContext, useState } from "react";

const CartContext = createContext([])

// proveedor
const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("products")) || [])


    // devuelve true si el producto que se quiere agregar ya esta en el cart
    const isInCart = (id) => {
        return cartProducts.some(prod => prod.product.id == id)
    }
    // agrega producto al carrito, si y solo si no esta en el cart. Si esta, actualizada su cantidad
    const addProductToCart = (product, qty) => {
        let value = { count: qty, product: product }
        if (isInCart(product.id)) {
            let obj = cartProducts.find((item) => item.product.id == product.id);
            obj.count += qty;
            let newArray = cartProducts.filter((item) => item.product.id !== product.id);
            setCartProducts(newArray);
            setCartProducts(cartProducts => [...cartProducts, obj]);
        }
        else {
            setCartProducts(cartProducts => [...cartProducts, value]);
            // Local storage
            localStorage.setItem("products", JSON.stringify([...cartProducts, value]))
        }
    }

    // elimina los productos cuyo id sean igual a el que viene como parametro
    const removeProductFromCart = (idProduct) => {
        const updatedCartProducts = cartProducts.filter((prod) => { return prod.product.id !== idProduct })
        setCartProducts(updatedCartProducts)
        localStorage.setItem("products", JSON.stringify(updatedCartProducts))

    }
    // remueve todos los items
    const clear = () => {
        const prods = []
        setCartProducts(prods)
        localStorage.clear()
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
        let newL = cartProducts.map((p) => {
            if (p.product.id == id)
                p.count = qty
            return p
        })       
        setCartProducts(newL);
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
            {/* componentes adentro del provider, o sea los consuldores */}
            {children}
        </CartContext.Provider>
    )
}

// exportamos
export { CartProvider }
export default CartContext