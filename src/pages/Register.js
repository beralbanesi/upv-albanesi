import './Login.css'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import db from "../Utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import Button from '@mui/material/Button';
import { Typography, TextField } from "@material-ui/core";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Register = () => {
    // Estados
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [error, setError] = useState();
    //snack bar
    const [openSnack, setOpenSnack] = React.useState(false);

    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnack(false);
        // redirijo a Home
        navigate('/')
      };

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signUp(user.email, user.password)
            registerUserOnDB()
            setOpenSnack(true)
        }
        catch (error) {
            setError(error.message)
            if (error.code === "auth/weak-password")
                setError("La password deberia contener al menos 6 caracteres")
            if (error.code === "auth/invalid-email")
                setError("El email es invalido")
            if (error.code === "auth/internal-error")
                setError("Error interno")
            if (error.code === "auth/email-already-in-use")
                setError("El usuario ya se encuentra registrado")
        }
    }

    // Guarda datos del usuario en la BD
    const registerUserOnDB = async () => {
        const newUser = {
            email: user.email,
            name: user.name,
            phone: user.phone
        }
        const usersFirebase = collection(db, 'usuarios')
        const userDoc = await addDoc(usersFirebase, newUser)
    }
 
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div className="main-container">
            {error && <p className="errorMessage">{error}</p>}
            <Typography variant="h5">Complete los datos</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="name"
                        name="name"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        required
                        label="Nombre y Apellido"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="phone"
                        name="phone"
                        style={{ width: "400px", margin: "5px" }}
                        type="phone"
                        label="Telefono"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        name="email"
                        style={{ width: "400px", margin: "5px" }}
                        required
                        type="email"
                        label="Email"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        name="password"
                        style={{ width: "400px", margin: "5px" }}
                        type="password"
                        required
                        label="Password"
                        variant="outlined"
                        autoComplete="on"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div>
                    <Button type='submit'
                        sx={[
                            { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', width: '15%', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                            { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                        ]}
                    > Registrar Usuario </Button>
                </div>
            </form>

            {openSnack && <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleClose}
                message="El usuario fue dado de alta exitosamente"
                action={action}
                sx={{ height: "100%"}}
                anchorOrigin={{
                   vertical: "top",
                   horizontal: "center"
                }}             
            />
            }
        </div>
    )
}
export default Register