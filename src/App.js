import './App.css';
import NavBar from './components/NavBar/NavBar';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactPage from './pages/Contact';
import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
//import ProductPage from './pages/Product';
import ErrorPage from './pages/Error';
import FaqPage from './pages/FAQ';
import AboutUsPage from './pages/AboutUs';
import CartPage from './pages/Cart';

function App() {  

  const [totalCount, setTotalCount] = useState(0);

  return (
    <div className="App">
    <BrowserRouter>
        <NavBar totalCount={totalCount}/>  
        <Routes>
          <Route path='/' element={ <HomePage/>}></Route>
          <Route path='/contacto' element={<ContactPage/>}></Route>
          <Route path='/categoria/:category/' element={<HomePage/>}></Route>
          <Route path='/productos/:id' element={<DetailPage/>}></Route>
          <Route path='/nosotros' element={<AboutUsPage/>}></Route>
          <Route path='/cart' element={<CartPage/>}></Route>
          <Route path='/faq' element={<FaqPage/>}></Route>
          <Route path='/brand' element={<HomePage/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>        
    </BrowserRouter>
    </div>
 
  );
}

export default App;
