import './Login.css'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography, TextField } from "@material-ui/core";

const LoginPage = () => {
    // Estados
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [error, setError] = useState();

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(user.email, user.password)
            navigate('/')
        }
        catch (error) {
            setError(error.message)
            if (error.code === "auth/wrong-password")
                setError("Password incorrecta")
            if (error.code === "auth/user-not-found")
                setError("El usuario no existe")
            if (error.code === "auth/invalid-email")
                setError("El email es invalido")
            if (error.code === "auth/internal-error")
                setError("Error interno")
        }
    }
    return (
        <div className='main-container'>
            {error && <p className='errorMessage'>{error}</p>}
            <Typography variant="h5">Ingrese sus datos</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="email"
                        name="email"
                        style={{ width: "400px", margin: "5px" }}
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
                    > Ingresar </Button>
                </div>
            </form>
            <div className='registerHere'> <span>¿No estas registrado?</span> <Link className='registerHere' to='../register'>[Registrate aca]</Link></div>
        </div>
    )
}
export default LoginPage