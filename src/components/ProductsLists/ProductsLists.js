
import ItemList from "../ItemList/ItemList";

const  ProductsLists = ({onTotalize,onSelectItem}) => {

    return(
        <>
        <ItemList category={"Ropa"} onTotalize={onTotalize} onSelectItem={onSelectItem}/>  
       {/*  <ItemList category={"Electrodomésticos"} onTotalize={onTotalize}/>    */}
        </>   
    );

}
export default ProductsLists;