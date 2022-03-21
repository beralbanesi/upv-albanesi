import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import React, { useState } from 'react';

function App() {  

  const [totalCount, setTotalCount] = useState(0);

  const onTotalize = (qty) => {   
      setTotalCount(totalCount + qty);       
  }; 
  return (
    <div className="App">   
      <NavBar totalCount={totalCount}/>  
      <ItemListContainer title="-.- PRODUCTOS EN OFERTA -.-" onTotalize={onTotalize}/>
    </div>
  );
}

export default App;
