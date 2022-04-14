import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from "../context/CartContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const CartPage = () => {

    const { cartProducts, removeProductFromCart, clear , totalPrice} = useContext(CartContext);
    const navigate = useNavigate();
    

    const handleDeleteClick = (idProduct) => {

        removeProductFromCart(idProduct);
    };

    const handleEmptyClick = () => {
        clear()
    }

    //table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            border: 'none'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',//theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div>
            <h1>Carrito de compras:</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                    <TableBody>
                        {cartProducts?.map((cartProduct, i) => (
                            <StyledTableRow key={cartProduct.product.title}>
                                <StyledTableCell component="th" scope="row">
                                    <img className='item-cart-modal__img' alt='Imagen de producto' src={`./${cartProduct.product.image}`} />

                                </StyledTableCell>
                                <StyledTableCell align="right"> {cartProduct.product.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">Precio unit.: ${cartProduct.product.price}</StyledTableCell>
                                <StyledTableCell align="right">Cantidad: {cartProduct.count}</StyledTableCell>
                                <StyledTableCell align="right"> Subtotal: ${(cartProduct.count * cartProduct.product.price).toFixed(2)}</StyledTableCell>
                                <StyledTableCell align="right">  <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => { handleDeleteClick(cartProduct.product.id) }}  /></StyledTableCell>

                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead className="table-cart">
                        <TableRow>
                            {totalPrice() !== 0 ? <StyledTableCell align="right">Total: ${totalPrice().toFixed(2)}</StyledTableCell>
                                : <StyledTableCell align="right">El carrito esta vacio</StyledTableCell>}
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="right">
                                {(cartProducts.length > 0) ? <div>
                                    <Button sx={{  textTransform: 'uppercase', width:'15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' }} onClick={() => { handleEmptyClick() }} >Vaciar carrito</Button>
                                    <Button sx={{  margin:2, textTransform: 'uppercase',width:'15%',cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' }} onClick={() => { navigate(`/`) }} >Seguir comprando</Button>
                                    <Button sx={{ textTransform: 'uppercase',width:'15%',cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' }}  onClick={() => { navigate(`/pay`) }} >Proceder pago</Button></div>
                                    : (cartProducts.length == 0) && <div><Button sx={{ textTransform: 'uppercase',cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' }} onClick={() => { navigate(`/`) }} >Seguir comprando</Button></div>
                                }
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>


        </div>
    )

}

export default CartPage;