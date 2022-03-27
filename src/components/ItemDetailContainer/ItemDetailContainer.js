import ItemDetail from "../ItemDetail/ItemDetail";
import React, { useEffect, useState } from 'react';
import MockData from "../../MockData/MockData";

const  ItemDetailContainer = ({id}) => {

const mockProducts = MockData();
 
  const [selectedProduct, setSelectedProduct] = useState(0);

  useEffect(() => {
    console.log('entro al use effect');
    console.log(mockProducts);
     getSelectedProduct().then((data) => {setSelectedProduct(data) }) 
    }, [{selectedProduct}] )

  const getSelectedProduct = () => {
    return new Promise((resolve, reject) => {   
      setTimeout(() => {
        if((id!=0) && (mockProducts[id-1].id = {id}) )
          resolve(mockProducts[id-1]);          
     
      }, 2000);
    });
  };
   
    return(  
        <>
        {id!=0 &&     
        <ItemDetail selectedProduct={selectedProduct} /> 
        } 
        </>               
    );

}
export default ItemDetailContainer;