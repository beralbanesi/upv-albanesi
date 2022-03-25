import * as React from 'react';
import  './NavBar.css'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import CartWidget from "../CartWidget/CartWidget";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';



/*Barra de busqueda*/
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



export default function NavBar({totalCount}) {
  return (
    <Box className="customBox">
     
      <AppBar position="static"  className='customBox'>        
        <Toolbar>

          <div className='container-logo'>
            <img src="./img/logo.png" className="img-header"/>    
          </div>
          <ul className="navbar">
            <li> <Button  className='custom-btn'  variant="contained">Home</Button>   </li>
            <li> <Button  className='custom-btn'  variant="contained">Productos</Button>   </li>
            <li> <Button  className='custom-btn'  variant="contained">Nosotros</Button>   </li>
            <li> <Button  className='custom-btn'  variant="contained">Contacto</Button>   </li>
            <li>
              <Search className="custom-Search-Bar"> 
                <SearchIconWrapper className='search-icon'>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase className='custom-input'  
                  placeholder="Buscar..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </li>
            <li >              
                 <CartWidget totalCount={totalCount}/>
            </li> 
            
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
  );
}