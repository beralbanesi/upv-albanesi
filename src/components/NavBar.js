import * as React from 'react';
import  './NavBar.css'; 
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { color } from '@mui/system';

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

export default function NavBar() {
  return (
    <Box className="customBox">
      <AppBar position="static"  className='customBox'>
        <Toolbar>
          <IconButton className="customIconButton" >     
             <MenuIcon />
          </IconButton>
          <div className='container-logo'>
            <img src="logo.png" className="img-header" width={120}/>    
         </div>
         <ul className="navbar">
            <li> <Button variant="contained">Home</Button>   </li>
            <li> <Button  variant="contained">Productos</Button>   </li>
            <li> <Button  variant="contained">Nosotros</Button>   </li>
            <li> <Button  variant="contained">Contacto</Button>   </li>
         
            <li>
                <Search>
                    <SearchIconWrapper>
                         <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Buscar…"
                         inputProps={{ 'aria-label': 'search'}              
                     }
                         />
                </Search>
          
          </li>
          
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
  );
}