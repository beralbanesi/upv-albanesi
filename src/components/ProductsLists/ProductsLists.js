
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";


const  ProductsLists = () => {

    const {category} = useParams()
 
    return(
        <>
            <ItemList category={category} />  
        </>   
    );

}
export default ProductsLists;