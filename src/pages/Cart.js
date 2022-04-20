import './Cart.css'
import { useContext, useState } from "react";
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
import Button from '@mui/material/Button';
import { Divider } from "@mui/material";
import db from "../Utils/firebase-config";
import { addDoc, collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
//
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const CartPage = () => {

    const { cartProducts, removeProductFromCart, clear, totalPrice, updateCartContextStock } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    })
    const formatDate = (current_datetime) => {
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        return formatted_date;
    }

    let aDate = formatDate(new Date())
   
    
    const [openModal, setOpenModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const [order, setOrder] = useState({
        buyer: { name: '', phone: '', email: '' },
        items: cartProducts.map((p) => { return { id: p.product.id, title: p.product.title, price: p.product.price, count: p.count } }),
        date: aDate,
        total: totalPrice()
    })

    const handleClose = () => {
        setOpenModal(false);
    };

    //console.log('fecha' + aDate)
    const [successOrder, setSuccessOrder] = useState()
    const navigate = useNavigate();

    const handleDeleteClick = (idProduct) => {
        removeProductFromCart(idProduct);
    };

    const handleEmptyClick = () => {
        clear()
    }

    const handleCheckOut = (e) => {
        e.preventDefault()
        order.buyer = formData;
        setOrder({ ...order })
        setOpenModal(false)
        pushOrder()
    }

    const pushOrder = async () => {
        const ordersFirebase = collection(db, 'ordenes')
        const orderDoc = await addDoc(ordersFirebase, order)
        setSuccessOrder(orderDoc.id)
        updateDBStock()
        setOpenSuccessModal(true) // dialog de exito
    }
    const updateDBStock = () => {
        const result = order.items.map((item) => {
            updateProduct(item)
        })
    }

    // actualizar stock de 1 producto de la BD
    const updateProduct = async (myOrder) => {
        const docRef = doc(db, 'productos', myOrder.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const newStock = docSnap.data().stock - myOrder.count
            updateDoc(docRef, {
                stock: newStock
            }).then(() => { })
        }
    };

    const handleChange = (e) => {
        //console.log('change' + e.target.name)
        const { value, name } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    //table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
            border: 'none'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
            color: theme.palette.common.black,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.white,//theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        },
    }));
    // dialog de exito de operacion
    const handleSuccessAccept = () => {
        setOpenSuccessModal(false);
        updateCartContextStock(order)
        clear();
        navigate(`/`);
    }

    const handleSuccessClose = () => {
        setOpenSuccessModal(false);
    };


    return (
        <div>
            <h1>Carrito de compras:</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                    <TableBody>
                        {cartProducts?.map((cartProduct, i) => (
                            <StyledTableRow key={cartProduct.product.title}>
                                <StyledTableCell component="th" scope="row">
                                    <img className='item-cart-modal__img' alt='Imagen de producto' src={`../img/${cartProduct.product.image}`} />

                                </StyledTableCell>
                                <StyledTableCell align="right"> {cartProduct.product.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">Precio unit.: ${cartProduct.product.price}</StyledTableCell>
                                <StyledTableCell align="right">Cantidad: {cartProduct.count} (un.)
                                </StyledTableCell>
                                <StyledTableCell align="right"> Subtotal: ${(cartProduct.count * cartProduct.product.price).toFixed(2)}</StyledTableCell>
                                <StyledTableCell align="right">  <DeleteIcon
                                    sx={[
                                        { cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', boxShadow: '1px 1px 5px', transition: 'all 0.2s ease' },
                                        { '&:hover': { transform: 'scale(1.09)' } }
                                    ]}
                                    onClick={() => { handleDeleteClick(cartProduct.product.id) }} /></StyledTableCell>

                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, minHeight: 300 }} aria-label="customized table">
                    <TableHead className="table-cart">
                        <TableRow>
                            {totalPrice() !== 0 ? <StyledTableCell sx={{ fontSize: 24, fontWeight: 'bold' }} align="right" >Total: ${totalPrice().toFixed(2)}</StyledTableCell>
                                : <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, fontSize: 24, fontWeight: 'bold' }} align="right">El carrito esta vacio</StyledTableCell>}
                        </TableRow>
                        <TableRow sx={{ backgroundColor: 'white' }}>
                            <StyledTableCell align="right">
                                {(cartProducts.length > 0) ?
                                    <div>
                                        <Button
                                            sx={[
                                                { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                                { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                            ]}
                                            onClick={() => { handleEmptyClick() }} >Vaciar carrito</Button>
                                        <Button
                                            sx={[
                                                { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                                { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                            ]}
                                            onClick={() => { navigate(`/`) }} >Seguir comprando</Button>
                                        <Button
                                            sx={[
                                                { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                                { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                            ]}
                                            onClick={() => setOpenModal(true)} >Completar compra</Button>
                                    </div>
                                    : (cartProducts.length == 0) &&
                                    <div>
                                        <Button
                                            sx={[
                                                { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                                { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                            ]}
                                            onClick={() => { navigate(`/`) }} >Seguir comprando</Button>
                                    </div>
                                }
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <Divider />
            {successOrder ?

                <Dialog open={openSuccessModal} onClose={handleSuccessClose}>
                    <DialogTitle >¡Felicitaciones! Tu orden se genero correctamente.</DialogTitle>
                    <DialogContent sx={{ fontWeight: 600 }}>Nro de orden: <span className='orderNumber'>{successOrder}</span></DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuccessAccept}>ACEPTAR</Button>
                    </DialogActions>
                </Dialog>

                : (
                    <div className="modal">
                        <Dialog open={openModal} onClose={handleClose}>
                            <DialogTitle>Completar compra</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Complete los campos indicados con (*).
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Nombre y Apellido"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    required
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="phone"
                                    name="phone"
                                    label="Telefono"
                                    type="phone"
                                    fullWidth
                                    variant="standard"
                                    required
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    required
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleCheckOut}>Proceder pago</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            }
        </div>
    )
}
export default CartPage;