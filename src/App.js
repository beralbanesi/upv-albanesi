import './App.css';
import NavBar from './components/NavBar/NavBar';
import React, { useState } from 'react';
import ProductsLists from './components/ProductsLists/ProductsLists';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {  

  const [totalCount, setTotalCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const onTotalize = (qty) => {   
      setTotalCount(totalCount + qty);       
  }; 

  const onSelectItem = (itemId) => {      
    setSelectedItem(itemId);
}; 

  

  return (
    <div className="App">   
      <NavBar totalCount={totalCount}/>  
      <ProductsLists onTotalize={onTotalize} onSelectItem={onSelectItem}/>
      {/* <ItemDetailContainer id={selectedItem}/> */}
     
      
      <ItemDetailContainer id={1}/>
     
    </div>
  );
}

export default App;
