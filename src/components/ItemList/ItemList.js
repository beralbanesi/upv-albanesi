import Item from "../Item/Item";
import React, { useEffect, useState } from 'react';

const ItemList = ({category, onTotalize}) => {

const mockProducts = [
    { id: 1, title: 'Zapatillas grises', description: 'Zapatillas grises 39', price: '4444.99', stock: 2, image: './img/zapatillas1.jpg' },
    { id: 2, title: 'Zapatillas rosa', description: 'Zapatillas rosa 38', price: '5999.50', stock: 5, image: './img/zapatillas2.jpg'},
    { id: 3, title: 'Jogging gris', description: 'Jogging gris XL', price: '6100.00', stock: 6, image: './img/pantalon1.jpg' },
    { id: 4, title: 'Pantalon azul', description: 'Pantalon azul unisex M', price: '8900.00', stock: 3, image: './img/pantalon2.jpg'},
    { id: 5, title: 'Pantalon sport', description: 'Pantalon sport S', price: '8100.00', stock: 2, image: './img/pantalon3.jpg'},
  ];
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
  getProducts().then((data) => {setProducts(data)  })},[] )
            //.catch((error) => {console.log(error)})
    
  return(
    <div className="container-cards">   
        <h2>{`Productos de la categoría ${category}`}</h2>       
        {products.map((product) => {
             return( <Item key={product.id} productData={product} onTotalize={onTotalize} ></Item>)
         })}
    </div>
  );
}
  export default  ItemList;