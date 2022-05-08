import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import db from "../Utils/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, background: 'rgba(30,30,30,.95)' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon sx={{color: 'white'}}/> : <KeyboardArrowDownIcon sx={{color: 'white'}}/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right" ><Typography sx={{ color: 'whitesmoke', fontWeight: 'bold' }}>Nro. de orden: </Typography></TableCell>
        <TableCell align="left" ><Typography sx={{ color: '#fd733c', fontWeight: 'bold' }}>{row.id}</Typography></TableCell>
        <TableCell align="right"><Typography sx={{ color: 'whitesmoke', fontWeight: 'bold' }}> Fecha:</Typography></TableCell>
        <TableCell align="left" ><Typography sx={{ color: '#107BD4', fontWeight: 'bold' }}>{row.date}</Typography></TableCell>
        <TableCell align="right"><Typography sx={{ color: 'whitesmoke', fontWeight: 'bold' }}>Monto total: </Typography></TableCell>
        <TableCell align="left" ><Typography sx={{ color: '#E41F1F', fontWeight: 'bold' }}>${(row.total).toFixed(2)}</Typography></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold' }} gutterBottom component="div">Detalle de la orden</Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ background: '#107BD4'}}>
                    <TableCell sx={{ color: 'white'}}>Producto</TableCell>
                    <TableCell sx={{ color: 'white'}} align="center">Cantidad</TableCell>
                    <TableCell sx={{ color: 'white'}} align="center">Precio</TableCell>
                    <TableCell sx={{ color: 'white'}} align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((historyRow, j) => (
                    <TableRow key={j}>
                      <TableCell component="th" scope="row">
                        {historyRow.title}
                      </TableCell>
                      <TableCell align="center">{historyRow.count}</TableCell>
                      <TableCell align="center">${historyRow.price}</TableCell>
                      <TableCell align="right">${(historyRow.count * historyRow.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number.isRequired,
        subtotal: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    )
  }).isRequired,
};

export default function MyOrdersPage() {
  const [userOrders, setUserOrders] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    setUserOrders([])
    if (user && user.email !== 'Invitado')
      getUserOrders().then((data) => {
        setUserOrders(data)
      }).finally(() => { })
  }, [user])

  const getUserOrders = async () => {
    //firebase
    const ordersQuery = query(collection(db, "ordenes"), where("buyer.email", "==", user.email))
    const querySnapshot = await getDocs(ordersQuery)
    let newOrders = []
    // guardo cada orden
    querySnapshot.docs.forEach((doc) => {
      const anOrder = {
        id: doc.id,
        date: doc.data().date,
        items: doc.data().items,
        total: doc.data().total
      }

      newOrders = [...newOrders, anOrder]
    });
    return newOrders;
  }

  return (
    <div className='main-container'>
      <TableContainer component={Paper} className="main-container">
        <h1 >Mis ordenes</h1>
        <Table aria-label="collapsible table">
          <TableBody>
            {userOrders.length > 0 && userOrders.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
