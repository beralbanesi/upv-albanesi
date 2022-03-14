import './App.css';
import NavBar from './components/NavBar';
import { StyledEngineProvider } from '@mui/material';

function App() {  
  return (
    <StyledEngineProvider injectFirst>
      <NavBar/>   
    </StyledEngineProvider>
  );
}

export default App;
