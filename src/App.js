import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactPage from './pages/Contact';
import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
import ErrorPage from './pages/Error';
import FaqPage from './pages/FAQ';
import AboutUsPage from './pages/AboutUs';
import CartPage from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Footer from './pages/Footer';
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MyOrdersPage from './pages/MyOrders';
import AdminPage from './pages/Admin';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
           <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={               
                  <HomePage />              
              }></Route>
              <Route path='/contacto' element={<ContactPage />}></Route>
              <Route path='/categoria/:category/' element={<HomePage />}></Route>
              <Route path='/productos/:id' element={<DetailPage />}></Route>
              <Route path='/nosotros' element={<AboutUsPage />}></Route>
              <Route path='/cart' element={<CartPage />}></Route>
              <Route path='/faq' element={<FaqPage />}></Route>
              <Route path='/brand' element={<HomePage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/myOrders' element={<MyOrdersPage />}></Route>
              <Route path='/admin' element={<AdminPage />}></Route>
              <Route path='/error' element={<ErrorPage />}></Route>                      
              <Route path='*' element={<ErrorPage />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
         </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
