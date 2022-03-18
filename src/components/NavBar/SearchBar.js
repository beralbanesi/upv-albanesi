import * as React from 'react';
import  './SearchBar.css'; 
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar(){
return (
  
<div className="search-bar"> 
    <div className="search-icon">  
      <SearchIcon />
    </div>
    <InputBase className="search-input"             
             placeholder="Buscar..."
             inputProps={{ 'aria-label': 'buscar' }}
           />
</div>


);

}