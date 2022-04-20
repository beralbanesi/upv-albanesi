import { useState, useEffect } from 'react'; 
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CartWidget from "../CartWidget/CartWidget";
import { useNavigate } from 'react-router-dom';
import MenuPopup from '../MenuPopup/MenuPopup';
import Search from '../Search/Search';
import db from "../../Utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function NavBar() {

  const [routes,setRoutes] = useState([])
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate(`./cart`)
  };

  const handleLogoClick = () => {
    navigate(`./brand`)
  };

  const handleInputClick = (e) => {
    let categories = ["Accesorios", "Remeras", "Pantalones", "Zapatillas"];
    const str = (e.target.value).toLowerCase();
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    if (categories.includes(str2)) {
      navigate(`./categoria/${str2}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let categories = ["Accesorios", "Remeras", "Pantalones", "Zapatillas"];
      const str = (e.target.value).toLowerCase();
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);     
      navigate(`./categoria/${str2}`);

     
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
              <MenuPopup routes= {routes}/>
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