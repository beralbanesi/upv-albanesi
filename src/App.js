import './App.css';
import NavBar from './components/NavBar/NavBar';
import React, { useState } from 'react';
import ProductsLists from './components/ProductsLists/ProductsLists';

function App() {  

  const [totalCount, setTotalCount] = useState(0);

  const onTotalize = (qty) => {   
      setTotalCount(totalCount + qty);       
  }; 
  return (
    <div className="App">   
      <NavBar totalCount={totalCount}/>  
      <ProductsLists onTotalize={onTotalize}/>
    </div>
  );
}

export default App;
