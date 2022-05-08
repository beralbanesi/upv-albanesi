import React, { useState } from 'react';
import './ItemCount.css';
import Fab from '@mui/material/Fab';
import { Button, Box } from '@mui/material';


const ItemCount = ({ stock, initialValue, onAdd }) => {

    const [count, setCount] = useState(1);

    const addCount = () => {
        (count < stock) && (setCount(count + 1));
    };

    const removeCount = () => {
        (count > initialValue) && (setCount(count - 1));
    };

    const handleOnAdd = () => {
        onAdd(count);
    }

    return (
        <div className='itemCount-container'>
            <div className='addRemove-container'>
                <Fab size="small" disabled={stock==0 ? true : null} sx={{
                    fontSize: 'large',                    
                    color: 'white',
                    background: '#fd733c', cursor: 'pointer',
                    '&:hover': { background: '#107BD4' }
                }} aria-label="add" onClick={removeCount} > - </Fab>
                <Box component="span" sx={{ padding: '15px', fontWeight: 'bold' }} >{stock == 0 ? 0 : count}</Box>
                <Fab size="small" disabled={stock==0 ? true : null} sx={{
                    fontSize: 'large',
                    color: 'white',
                    background: '#fd733c', cursor: 'pointer',
                    '&:hover': { background: '#107BD4' }
                }} aria-label="add" onClick={addCount}> + </Fab>
            </div>
            <p className='noStock' >{stock == 0 ? 'No hay stock' : null}</p>

            <Button
                sx={[
                    { width: '180px', boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                    { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } },
                    { '&:disabled': { backgroundColor: '#BFC6D4' } }
                ]}
                onClick={handleOnAdd} disabled={stock==0 ? true : null}>AGREGAR AL CARRITO</Button>
        </div>

    );
}
export default ItemCount;