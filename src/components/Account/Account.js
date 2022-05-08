import './Account.css';
import * as React from 'react';
import { useEffect, useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import db from "../../Utils/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function MenuPopup() {
    // contexto
    const { clear } = useContext(CartContext);
    
    const navigate = useNavigate()

    // estado
    const [userName, setUserName] = useState('');

    // sesion usuario
    const { logOut, user } = useAuth()

    // log out sesion
    const handleLogOut = async () => {
        await logOut()
        // al hacer el logout, vacio el carrito
        clear()
        //voy al home
        navigate('/')
    }

    // cuando cambia el userName
    useEffect(() => {
        getUserName();
    }, [userName])

    // busca usuario en BD
    const getUserName = async () => {
        //firebase
        const userQuery = query(collection(db, "usuarios"), where("email", "==", user.email));
        const querySnapshot = await getDocs(userQuery);
        // si se encontro el usuario, lo setea en el estado
        if (querySnapshot.docs[0]) {
            setUserName(querySnapshot.docs[0].data().name)
        }
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <AccountCircle {...bindTrigger(popupState)}
                        sx={{ marginLeft: '20px', width: '40px', height: '40px', cursor: 'pointer' }}
                    />
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem sx={{ color: '#107BD4', cursor: 'default' }}>{userName}</MenuItem>
                        <MenuItem onClick={popupState.close}><img className="menu-icons" src="../img/ordersIcon.png" /><Link to='../myOrders'>Mis ordenes</Link></MenuItem>
                        <MenuItem onClick={handleLogOut}><img className="menu-icons" src="../img/logOutIcon.png" />Cerrar sesion</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}