import './ItemDetail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useNavigate } from 'react-router-dom';
import CartContext from "../../context/CartContext";
import db from '../../Utils/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

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

  const [cartValue, setCartValue] = useState(0)

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

    const docRef = doc(db, 'productos', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const item = docSnap.data();
      item.id = id;
      setSelectedProduct(item)
    }
    else {
      navigate('/error')

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
          <Item sx={{ mt: '100px', height: 'auto', minHeight: '900px' }}>
            <img className="selected-card-item-img" alt='Imagen de producto' src={`../img/${selectedProduct.image}`} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ mt: '100px', color: 'black', minHeight: '900px' }}>
            {selectedProduct &&
              <div className="selected-card-item-category">&gt;&gt;&gt;{selectedProduct.category} </div>
            }
            <div className="selected-card-item-title">{selectedProduct.title}</div>
            <div className="selected-card-item-price">Precio: ${selectedProduct.price}</div>
            <div className="selected-card-item-description">{selectedProduct.description}</div>
            <div className="selected-card-item-description"><span>Talles disponibles:
              {selectedProduct.sizes?.map((size, i) => {
                let s = `[${size}]`
                return s
              })
              }
            </span>
            </div>
            <div className="selected-card-item-description">
              <span >Colores disponibles:</span>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                {selectedProduct.colors?.map((color, i) => {
                  return <Fab key={i} size="small" sx={{
                    background: `${color}`, cursor: 'default',
                    '&:hover': { background: `${color}` }
                  }} aria-label="add" ></Fab>
                })
                }
              </Box>
            </div>
            <div className="selected-card-item-description"><span >Puntuación:</span> {starItems} </div>
            <div className="selected-card-item-description"><span>Stock disponible: {(selectedProduct.stock > 0) ? selectedProduct.stock : <span>-</span>}</span></div>
            <div className='selected-card-item-itemCount'>
              {(cartValue == 0) ? <ItemCount stock={selectedProduct.stock} initialValue={1} onAdd={onAdd} />
                : <div className='finish-container'>
                  <Button
                    sx={[
                      { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '30%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                      { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                    ]}
                    onClick={() => { navigate('/cart') }} >INICIAR LA COMPRA
                  </Button>
                  <Button
                    sx={[
                      { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '30%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                      { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                    ]}
                    onClick={() => { navigate('/') }} >SEGUIR COMPRANDO
                  </Button>
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