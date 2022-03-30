import Item from "../Item/Item";
import React, { useEffect, useState } from 'react';
import MockData from "../../MockData/MockData";

const ItemList = ({category, onTotalize, onSelectItem}) => {

  const mockProducts = MockData();
  
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(mockProducts.length>0)
          resolve(mockProducts);          
        else
          reject('error');
      }, 2000);
    });
  };

  useEffect(() => {
    getProducts().then((data) => {setProducts(data)
      }).finally( () => {
        console.log ("Fin de la llamada" )
         })
        },[] )
    
  return(
    <div className="container-cards">   
        <h2>{`Productos de la categoría ${category}`}</h2>       
        {  /* products.length ? ( products.map((product) => {
                     return( <Item key={product.id} productData={product} onTotalize={onTotalize} onSelectItem={onSelectItem}></Item>)
                          )
                      : <p>cargando productos..</p>* */
            (products.length>0)&&products.map((product) => {
             return( <Item key={product.id} productData={product} onTotalize={onTotalize} onSelectItem={onSelectItem}></Item>)
         })}
    </div>
  );
}
  export default  ItemList;