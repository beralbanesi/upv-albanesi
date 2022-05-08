import './Cart.css'
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import { Button, Box } from '@mui/material';
import { Divider } from "@mui/material";
import db from "../Utils/firebase-config";
import { addDoc, collection, doc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const CartPage = () => {

    const { cartProducts, removeProductFromCart, clear, totalPrice, updateCartContextStock, updateCount } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    })

    const { user } = useAuth()

    const formatCurrentDate = (current_datetime) => {
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        return formatted_date;
    }
    let aDate = formatCurrentDate(new Date())

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
        order.buyer = formData
        order.items = cartProducts.map((p) => { return { id: p.product.id, title: p.product.title, price: p.product.price, count: p.count } })
        order.total = totalPrice()
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
        order.items.map((item) => {
            return updateProduct(item)
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
        const { value, name } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    //table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#DDDDDD',
            color: theme.palette.common.black,
            border: 'none',
            fontSize: 22,
            fontWeight: 'bold',

        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 20,
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
        clear()
        navigate('/')
    }

    const handleSuccessClose = () => {
        setOpenSuccessModal(false)
    };

    const handleOpenModal = async () => {
        //firebase
        const userQuery = query(collection(db, "usuarios"), where("email", "==", user.email));
        const querySnapshot = await getDocs(userQuery);
        // si se encontro el usuario en BD
        if (querySnapshot.docs[0]) {
            const newFormData =
            {
                name: querySnapshot.docs[0].data().name,
                phone: querySnapshot.docs[0].data().phone,
                email: querySnapshot.docs[0].data().email
            }
            setFormData(newFormData)
            setOpenModal(true)
            return
        }
        else {
            setFormData({})
            setOpenModal(true)
        }
    }

    //incrementa count de un producto  q viene como parametro (en cartProducts)
    const addCount = (prod) => {
        let newValue = prod.count + 1;
        (newValue <= prod.product.stock) && (updateCount(prod.product.id, newValue))

    };

    //decrementa count de un producto  q viene como parametro (en cartProducts)
    const removeCount = (prod) => {
        let newValue = prod.count - 1;
        (newValue > 0) && (updateCount(prod.product.id, newValue));
    };

    return (
        <div className='main-container'>
            <h1>Carrito de compras</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className="table-cart">
                        <TableRow>
                            <StyledTableCell align="center">Producto</StyledTableCell>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Precio unit.</StyledTableCell>
                            <StyledTableCell align="center">Cantidad</StyledTableCell>
                            <StyledTableCell align="center">Subtotal</StyledTableCell>
                            <StyledTableCell align="center">Eliminar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartProducts?.map((cartProduct, i) => (
                            <StyledTableRow key={cartProduct.product.title}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    <Link to={`/productos/${cartProduct.product.id}`} >
                                        <img className='item-img' alt='Imagen de producto' src={`../img/${cartProduct.product.image}`} />
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="center"> {cartProduct.product.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">${cartProduct.product.price}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {/* <button className='itemCount-btn' onClick={() => { removeCount(cartProduct) }} disabled={cartProduct.count <= 0 ? true : null} > - </button>
                                    {cartProduct.count}
                                    <button className='itemCount-btn' onClick={() => { addCount(cartProduct) }} disabled={cartProduct.count >= cartProduct.product.stock ? true : null}> + </button> */}
                                    <Fab size="small" disabled={cartProduct.count >= cartProduct.stock ? true : null}
                                        sx={{
                                            fontSize: 'large',
                                            color: 'white',
                                            background: '#fd733c', cursor: 'pointer',
                                            '&:hover': { background: '#107BD4' }
                                        }} aria-label="add"
                                        onClick={() => { removeCount(cartProduct) }} > - </Fab>
                                    <Box component="span" sx={{ padding: '15px', fontWeight: 'bold' }}> {cartProduct.count} </Box>
                                    <Fab size="small" disabled={cartProduct.count >= cartProduct.stock ? true : null}
                                        sx={{
                                            fontSize: 'large',
                                            color: 'white',
                                            background: '#fd733c', cursor: 'pointer',
                                            '&:hover': { background: '#107BD4' }
                                        }} aria-label="add"
                                        onClick={() => { addCount(cartProduct) }}> + </Fab>
                                </StyledTableCell>
                                <StyledTableCell align="center">${(cartProduct.count * cartProduct.product.price).toFixed(2)}</StyledTableCell>
                                <StyledTableCell align="center">  <DeleteIcon
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
                <Table sx={{ minWidth: 300}} aria-label="customized table">
                    <TableHead className="table-cart">
                        <TableRow>
                            {totalPrice() !== 0 ? <StyledTableCell align="right" >Total: ${totalPrice().toFixed(2)}</StyledTableCell>
                                : <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, fontSize: 24, fontWeight: 'bold' }} align="right">El carrito esta vacio</StyledTableCell>}
                        </TableRow>
                        <TableRow>
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
                                            onClick={() => { navigate('/') }} >Seguir comprando</Button>
                                        <Button
                                            sx={[
                                                { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                                { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                            ]}
                                            onClick={handleOpenModal} >Completar compra</Button>
                                    </div>
                                    : (cartProducts.length == 0) &&
                                    <div>
                                        <Button
                                            sx={[
                                                { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                                { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                            ]}
                                            onClick={() => { navigate('/') }} >Seguir comprando</Button>
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
                    <DialogContent sx={{ fontWeight: 600 }}>Nro de orden: <span className='order-number'>{successOrder}</span></DialogContent>
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
                                    disabled={user && user.email != 'Invitado' ? true : null}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    label="Nombre y Apellido"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    required
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <TextField
                                    disabled={user && user.email != 'Invitado' ? true : null}
                                    autoFocus
                                    margin="dense"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    label="Telefono"
                                    type="phone"
                                    fullWidth
                                    variant="standard"
                                    required
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <TextField
                                    disabled={user && user.email != 'Invitado' ? true : null}
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    required
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    sx={[
                                        { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '30%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                        { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                    ]}
                                    onClick={handleClose}>Cancel</Button>
                                <Button
                                    sx={[
                                        { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '30%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                                        { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                                    ]}
                                    onClick={handleCheckOut}>Enviar orden</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            }
        </div>
    )
}
export default CartPage;