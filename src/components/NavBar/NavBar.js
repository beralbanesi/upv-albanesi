import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CartWidget from "../CartWidget/CartWidget";
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import { useAuth } from '../../context/AuthContext';
import Account from '../Account/Account';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories, getRoutes } from "../../Utils/data";

export default function NavBar() {

  const [routes, setRoutes] = useState([])
  const [categories, setCategories] = useState('');  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Sesion usuario
  const { user } = useAuth()

  const handleCartClick = () => {
    navigate('./cart')
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoClick = () => {
    navigate('./brand')
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const str = (e.target.value).toLowerCase();
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      navigate(`./categoria/${str2}`);
    }
  }

  const handleLogIn = () => {
    navigate('./login')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // leo las rutas desde BD 
    getRoutes().then((data) => {
      setRoutes(data)
    }).finally(() => { })
    // leo las categorias desde BD 
    setCategories([])
    getCategories().then((data) => {
      setCategories(data)
    }).finally(() => { })
  }, [])

  return (
    <Box>
      <AppBar position="static" className='appBar'>
        <Toolbar>
          <div className='container-logo' key="container-logo">
            <img key="img-logo" src="../img/logo.png" alt='Logo UPV' className="img-header" onClick={handleLogoClick} />
          </div>          
          <ul className='navbar' key='navBar'>
            {routes.map((route, i) => {
              return (
                route.title !== 'Productos' ? (
                  <li key={`li1${route.title}${i}`}>
                    <Button variant="contained" key={`${route.title}${i}`}>
                      <Link key={`link${route.title}`} to={route.url}>{route.title}</Link>
                    </Button>
                  </li >) : (
                  <li key={`li2${route.title}${i}`}>
                    <Button key={`button${route.title}`}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >{route.title}</Button>
                    <Menu
                      key={`menu${route.title}${i}`}
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {categories && categories.map((cat) => {
                        return (
                          <MenuItem onClick={handleClose} key={cat.id}>
                            <Link key={`linkCat${route.title}${i}`} to={`/categoria/${cat.name}`}>{cat.name}</Link>
                          </MenuItem>)
                      })}
                    </Menu>
                  </li>
                ))
            })
            }
            <li>
              <Search handleKeyPress={handleKeyPress} key='search' />
            </li>
            <li >
              <CartWidget action={handleCartClick} key='cartwidget' />
            </li>
            {(user && user.email !== 'Invitado')?( <li><Account key='account' /></li>)
             : (<li><Button onClick={handleLogIn}>INGRESAR</Button></li>)
             }         
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
  );
}