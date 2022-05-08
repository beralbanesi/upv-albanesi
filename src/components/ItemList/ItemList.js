import './ItemList.css';
import Item from "../Item/Item";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs } from "firebase/firestore";
import db from "../../Utils/firebase-config";

const ItemList = ({ category = 'listAll' }) => {
  // estados
  const [products, setProducts] = useState([]);
  const [showCircularProgress, setShowCircularProgress] = useState(true);

  // funcion para eliminar duplicados de un array
  function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  // filtra productos por categoria
  const findProductByCategory = (products, category) => {
    if (category === 'listAll') {
      setProducts([])
      setShowCircularProgress(false);//products.length == 0)
      return setProducts(products)
    }
    else {
      // me quedo con las categorias
      let cats = uniq(products.map((product) => {
        let cat = product.category
        return cat
      }))

      // si el texto a buscar es una categoria valida, busco por categoria
      if (cats.includes(category)) {
        products.map((product) => {
          if (product.category == category) {
            return setProducts(products => [...products, product]);
          }
        })
      }
      // el texto a buscar NO es una categoria, busco por descripcion
      else {
        products.map((product) => {
          let desc = product.description.toUpperCase();        
          if (desc.includes(category.toUpperCase())) {
            return setProducts(products => [...products, product]);
          }
        })    
      }
      setShowCircularProgress(false);//products.length == 0)
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
    setShowCircularProgress(true)
    getProducts().then((data) => {
      findProductByCategory(data, category)
    }).finally(() => { })
  }, [category])

  return (
    <div className="main-container">
      {(category === "listAll")&&(!showCircularProgress) && <h1>Listado completo de productos</h1>}
      {(category !== "listAll")&&(!showCircularProgress) && (products.length > 0)&& <h1>Productos: '{category}'</h1>}
      {(category !== "listAll")&&(!showCircularProgress) && (products.length == 0)&& <h1>No hay productos para la búsqueda realizada</h1>}
       {                         
        (!showCircularProgress) ? products.map((product) => {
          return (<Item key={product.id} productData={product} ></Item>)
        })
          : <div className="circular-progress"><CircularProgress /></div>
      }
    </div>
  );
}
export default ItemList;