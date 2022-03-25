import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import  '../NavBar/NavBar.css'; 



export default function CartWidget({totalCount}){
    return(

    <IconButton className='custom-icon-cart' aria-label="agregar al carrito"  >
       <ShoppingCartIcon/> <p className='subidc' >{totalCount}</p>
    </IconButton>);

}