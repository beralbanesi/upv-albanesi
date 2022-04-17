import './ItemDetail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useNavigate } from 'react-router-dom';
import CartContext from "../../context/CartContext";
import db from '../../Utils/firebase-config';
import { getDoc, doc } from 'firebase/firestore';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemDetail = () => {
  const { id } = useParams()

  // estados
  const [selectedProduct, setSelectedProduct] = useState({})

  const [cartValue, setCartValue] = useState(0) // useState([])  //[{ idProducto: 0, count: 0} ]

  // consumir el contexto
  const { addProductToCart } = useContext(CartContext);

  const navigate = useNavigate();

  // para dibujar las estrellas de la puntuacion
  const starItems = [];
  for (let index = 0; index < selectedProduct.stars; index++) {
    starItems.push(<span key={index} className='star'></span>)
  }

  //firebase
  const getProduct = async () => {
    // console.log("id: ", id)
    const docRef = doc(db, 'productos', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const item = docSnap.data();
      item.id = id;
      setSelectedProduct(item)
    }
    else {
      console.log('No se encontro el producto con ese id')
    }
  }



  // en montaje
  useEffect(() => {
    getProduct()  // con firebase
  }, [])



  // al actualizar el carrito
  useEffect(() => {

  }, [cartValue])


  const onAdd = (qty) => {
    setCartValue(qty)
    addProductToCart(selectedProduct, qty);

  }

  return (

    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item sx={{ mt: '100px', height: 'auto' }}>
            <img className="selected-card-item-img" alt='Imagen de producto' src={`../img/${selectedProduct.image}`} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ mt: '100px' }}>
            {selectedProduct &&
              <div className="selected-card-item-category">&gt;&gt;&gt;{selectedProduct.category} </div>
            }
            <div className="selected-card-item-title">{selectedProduct.title}</div>
            <div className="selected-card-item-description">{selectedProduct.description}</div>
            <div className="selected-card-item-description"><span>Talles disponibles:
              <select className='select-sizes'>
                {selectedProduct.sizes?.map((size, i) => {
                  return <option key={i} value={size}>{size} </option>
                })
                }
              </select>
            </span>
            </div>
            <div className="selected-card-item-description">
              <span >Colores disponibles:</span>
              {selectedProduct.colors?.map((color, i) => {
                return <button key={i} style={{ marginLeft: '10px', verticalAlign: 'top', background: `${color}`, borderRadius: '50%', width: '25px', height: '25px' }}><a href="#" ></a></button>
              })
              }

            </div>
            <div className="selected-card-item-description"><span >Puntuación:</span> {starItems} </div>
            <div className="selected-card-item-description"><span>Stock disponible: {selectedProduct.stock}</span></div>
            <div>
              {(cartValue == 0) ? <ItemCount stock={selectedProduct.stock} initialValue={1} onAdd={onAdd} />
                : <div className='finish-container'>
                  <button className="finish-btn"
                    onClick={() => { navigate(`/cart`) }} >FINALIZAR COMPRA
                  </button>
                  <button className="finish-btn"
                    onClick={() => { navigate(`/`) }} >SEGUIR COMPRANDO
                  </button>
                </div>
              }
            </div>

          </Item>
        </Grid>

      </Grid>
    </Box>


  );
}

export default ItemDetail;