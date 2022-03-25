
import ItemList from "../ItemList/ItemList";

const  ProductsLists = ({onTotalize}) => {

    return(
        <>
        <ItemList category={"Ropa"} onTotalize={onTotalize}/>  
       {/*  <ItemList category={"Electrodomésticos"} onTotalize={onTotalize}/>    */}
        </>   
    );

}
export default ProductsLists;