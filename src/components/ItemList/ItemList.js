import Item from "../Item/Item";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs } from "firebase/firestore";
import db from "../../Utils/firebase-config";

const ItemList = ({ category = 'listAll' }) => {
  // estados
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
      })
    }
  }
  
  const getProducts = async () => {
    const productsCollection = collection(db, 'productos');
    //fcion asincrona:
    const productsSnapshot = await getDocs(productsCollection);
    const productList = productsSnapshot.docs.map((doc) => {
      let product = doc.data();
      product.id = doc.id;     
      return product
    })
    return productList
  }


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
      {(category !== "listAll")? <h1>Productos de la categoría {category}</h1>
      : <h1>Listado de productos</h1>}
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