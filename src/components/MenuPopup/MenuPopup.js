import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

export default function MenuPopup() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button className='group-style'>
                   <Link to={'/'}>Home</Link>
                </Button>
                <Button variant="text" {...bindTrigger(popupState)}>
                        Productos
               </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}><Link to='/categoria/Accesorios' >Accesorios</Link></MenuItem>
                        <MenuItem onClick={popupState.close}><Link to='/categoria/Pantalones' >Pantalones</Link></MenuItem>
                        <MenuItem onClick={popupState.close}><Link to='/categoria/Remeras' >Remeras</Link></MenuItem>
                        <MenuItem onClick={popupState.close}><Link to='/categoria/Zapatillas' >Zapatillas</Link></MenuItem>
                    </Menu>
                <Button className='group-style'>                        
                    <Link to={'/nosotros'}>Nosotros</Link>
                </Button>
                <Button className='group-style'>
                    <Link to={'/faq'}>FAQ</Link>
                </Button>
                <Button className='group-style'>
                    <Link to={'/contacto'}>Contacto</Link>
                </Button>
              </React.Fragment>
            )}
        </PopupState>
    );
}