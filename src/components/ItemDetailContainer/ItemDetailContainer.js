import ItemDetail from "../ItemDetail/ItemDetail";
import React, { useEffect, useState } from 'react';
import mockProducts from "../../Utils/data";

const  ItemDetailContainer = ({id}) => {

 
  const [selectedProduct, setSelectedProduct] = useState(0);
  
  useEffect(() => {
    
     getSelectedProduct().then((data) => {setSelectedProduct(data)
     }).finally(() => {
      console.log ("termino la llamada")
    })}, [] )

 

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
        {selectedProduct!=0 &&     
        <ItemDetail selectedProduct={selectedProduct} /> 
        } 
        </>               
    );

}
export default ItemDetailContainer;