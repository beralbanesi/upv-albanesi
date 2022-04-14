import Item from "../Item/Item";
import React, { useEffect, useState } from 'react';
import mockProducts from "../../Utils/data";
import CircularProgress from '@mui/material/CircularProgress';


const ItemList = ({ category = 'listAll' }) => {

  const [products, setProducts] = useState([]);

  // filtra productos por categoria
  const findProductByCategory = (products, category) => {

    if (category === 'listAll') {
      setProducts([])
      return setProducts(products)
    }
    else {
      products.map((product) => {
        if (product.category == category) {
          return setProducts(products => [...products, product]);
        }
      }
      )
    }
  }

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockProducts.length > 0)
          resolve(mockProducts);
        else
          reject('error');
      }, 2000);
    });
  };

  useEffect(() => {

    setProducts([])
    getProducts().then((data) => {
      findProductByCategory(data, category)
    }).finally(() => {
      console.log("Fin de la llamada")
    })
  }, [category])


  return (



    <div className="container-cards">
      {(category !== "listAll") && <h2>Productos de la categoría {category}</h2>}
      {
        (products.length > 0) ? products.map((product) => {
          return (<Item key={product.id} productData={product} ></Item>)
        })
          : <div className="circular-progress"><CircularProgress /></div>
      }
    </div>
  );
}
export default ItemList;