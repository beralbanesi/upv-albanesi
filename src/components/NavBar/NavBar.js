import * as React from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CartWidget from "../CartWidget/CartWidget";
import { useNavigate } from 'react-router-dom';
import MenuPopup from '../MenuPopup/MenuPopup';
import Search from '../Search/Search';


export default function NavBar() {
  /*Menu desplegable */
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate(`./cart`)
  };

  const handleLogoClick = () => {
    navigate(`./brand`)
  };

  const handleInputClick = (e) => {
    /*busque y direccione a la categoria*/
    console.log('click: ' + e.target.value)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let categories = ["Accesorios", "Remeras", "Pantalones", "Zapatillas"];
      if (categories.includes(e.target.value)) {
        navigate(`./categoria/${e.target.value}`);
        console.log(' entro por default presiono enter: ' + e.target.value)
      }
    }
  }


  return (
    <Box className="customBox">
      <AppBar position="static" className='customBox'>
        <Toolbar>
          <div className='container-logo'>
            <img src="../img/logo.png" alt='Logo UPV' className="img-header" onClick={handleLogoClick} />
          </div>
          <ul className="navbar">
            <li>
              <MenuPopup />
            </li>            
            <li>
              <Search handleInputClick={handleInputClick} handleKeyPress={handleKeyPress} />
            </li>
            <li >
              <CartWidget action={handleCartClick} />
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
  );
}