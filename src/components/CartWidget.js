import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import  './NavBar/NavBar.css'; 
/*import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";*/


export default function CartWidget({count}){
    return(

    <IconButton className='custom-icon-cart' aria-label="agregar al carrito"  >
       <ShoppingCartIcon/> <p className='subidc' >2</p>
    </IconButton>);

/*<IconButton type="button" className='redondo'> <img src="../carrito.png" className="img-carrito" /></IconButton>);*/
}