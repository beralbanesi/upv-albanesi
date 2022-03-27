
import React, { useState } from 'react';


const ItemCount = ({stock, initialValue, onAdd}) => {

    const [count, setCount] = useState(1);
    

    const addCount = () => {
        (count<stock)&&(setCount(count + 1));       
      };    
      const removeCount = () => {
        (count>initialValue)&&(setCount(count - 1));       
      };   
      
      const handleOnAdd  = () => {
          onAdd(count);
          
      }
    
    return (
        <div className='itemCount-container'>
        <div className='addRemove-container'>
            <button className='itemCount-btn' onClick={removeCount}  disabled={ count<= 0 ? true : null} > - </button>  
            {count}
            <button  className='itemCount-btn' onClick={addCount}  disabled={ count>= stock ? true : null}> + </button>
            
        </div>
        <button className='addCart-btn' onClick={handleOnAdd}>AGREGAR AL CARRITO</button>
        </div>

    );
}
export default ItemCount;