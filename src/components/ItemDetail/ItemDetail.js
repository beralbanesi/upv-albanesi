import './ItemDetail.css';
import mockData from '../../Utils/data';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams()

  // estados
  const [selectedProduct, setSelectedProduct] = useState({})
  const [cartValue, setCartValue] = useState(0) // useState([])  //[{ idProducto: 0, count: 0} ]


  const navigate = useNavigate();

  // para dibujar las estrellas de la puntuacion
  const starItems = [];
  for (let index = 0; index < selectedProduct.stars; index++) {
    starItems.push(<span key={index} className='star'></span>)
  }

  // recuperar el producto que viene como parametro
  const filterProductById = (products, id) => {
    return products.map((product) => {
      if (product.id == id) {
        setSelectedProduct(product)
      }
    })
  }

  // en montaje
  useEffect(() => {
    filterProductById(mockData, id);
  }, [])

  // al actualizar el carrito
  useEffect(() => {
    console.log('La cantidad de productos en el carrito es: ' + cartValue);
  }, [cartValue])

  const onAdd = (qty) => {
    setCartValue(qty)
    alert(`Se agregaron ${qty} productos al carrito.`);
  }

  return (
    <div className="container-cards">
      <div className="product-container">
        <div className="product-content">
          <div className="column1">
            <img className="selected-card-item-img" src={selectedProduct.image} />
          </div>
          <div className="column2">
            <div className="selected-card-item-category">>>> {selectedProduct.category}</div>
            <div className="selected-card-item-title">{selectedProduct.title}</div>
            <div className="selected-card-item-price">Precio: ${selectedProduct.price}   </div>
            <ul className='selected-card-item-ul'>
              <li><span className="selected-card-item-description">Detalle del producto: {selectedProduct.description}</span></li>

              <li><span className="selected-card-item-description">Talle:
                <select className='select-sizes'>
                  {selectedProduct.sizes?.map((size, i) => {
                    return <option key={i} value={size}>{size} </option>
                  })
                  }
                </select>
              </span>
              </li>
              <li><span className="selected-card-item-description">Puntuación:</span> {starItems} </li>
              <li><span className="selected-card-item-description">Stock disponible: {selectedProduct.stock}</span></li>
              <li><span className="selected-card-item-description">Colores disponibles:
                <ul className='color-info'>
                  {selectedProduct.colors?.map((color, i) => {
                    return <li key={color.id} style={{ background: `${color.hex}`, listStyle: `none` }}><a href="#" ></a></li>
                  })
                  }
                </ul>
              </span>
              </li>

            </ul>
            {/* <button className="addCart-btn"  >Comprar</button> */}
            <div>
              {/* Desafio 31-03 */}
              {(cartValue == 0) ? <ItemCount stock={selectedProduct.stock} initialValue={1} onAdd={onAdd} />
                : <div className='finish-container'><button className="finish-btn" onClick={() => { navigate(`/cart`) }} >Finalizar compra</button></div>

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;