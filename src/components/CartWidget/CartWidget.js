import './CartWidget.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import '../NavBar/NavBar.css';
import { useState, useContext } from 'react';
import CartContext from '../../context/CartContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function CartWidget() {
    const { cartProducts, removeProductFromCart, amount } = useContext(CartContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = (idProduct) => {

        removeProductFromCart(idProduct);
    };


    return (
        <div className="cartWidget-container">
            <div className="cartIcon-container">

                {amount() > 0 && <ShoppingCartIcon
                    onClick={handleClick}
                    size="small"
                    sx={[
                        { marginLeft:2, marginBottom: 2, cursor: 'pointer', width: '40px', height: '40px', transition: 'all 0.2s ease' },
                        { '&:hover': { transform: 'scale(1.09)' } }
                    ]}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                />}
                {cartProducts.length > 0 ? <p className='subidc' > {amount()} </p> : <p className='subidc' > </p>}
            </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                className='cart-modal'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflowY: 'auto',
                        colorScheme: 'dark',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {(cartProducts.length > 0) ? <p className='item-cart-modal-title'>
                    Carrito de Compras</p> : <p className='item-cart-modal-title'>El Carrito esta Vacio</p>}
                <Divider />
                {cartProducts?.map((cartProduct) => {
                    return (
                        <MenuItem className='item-cart-modal' key={cartProduct.product.id}>
                            <div className='item-cart-modal__img'>
                                <img className='item-cart-modal__img' alt='Imagen de producto' src={`../img/${cartProduct.product.image}`} />
                            </div>
                            <div className='item-cart-modal__info'>
                                <p>{cartProduct.product.title} ({cartProduct.count} un.) </p>
                                <span>$ {cartProduct.product.price}</span>
                            </div>
                            <div className='item-cart-modal__action'>
                                <DeleteIcon
                                    sx={[
                                        { cursor: 'pointer', width: '25px', height: '25px', borderRadius: '50%', boxShadow: '1px 1px 5px', transition: 'all 0.2s ease' },
                                        { '&:hover': { transform: 'scale(1.09)' } }
                                    ]}
                                    onClick={() => { handleDeleteClick(cartProduct.product.id) }} />
                            </div>
                        </MenuItem>
                    )
                })}

                <Divider />
                <div className='footer-modal-cart'>
                    {cartProducts.length > 0 && <Button className="btn-custom"><Link to="/cart">Iniciar la compra</Link></Button>
                    }
                </div>
            </Menu>
        </div>
    );
}