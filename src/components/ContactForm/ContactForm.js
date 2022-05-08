import "./ContactForm.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import { addDoc, collection } from "firebase/firestore";
import db from "../../Utils/firebase-config";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ContactForm = () => {
    //snack bar
    const [openSnack, setOpenSnack] = React.useState(false);
    const [response, setResponse] = useState('')
    const navigate = useNavigate()
    const [contactMsg, setContactMsg] = useState(
        {
            name: '',
            phone: '',
            email: '',
            area: '',
            reason: '',
            message: '',
            date: ''
        }
    )
    
    const formatCurrentDate = (current_datetime) => {
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        return formatted_date;
    }
    let aDate = formatCurrentDate(new Date())

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            addMessageOnDB()
            setResponse("El mensaje fue enviado con exito")
            setOpenSnack(true)
        }
        catch (error) {
            setResponse("Error:", error)
            setOpenSnack(true)
        }
    }

    const handleChange = ({ target: { name, value } }) => {
        setContactMsg({ ...contactMsg, [name]: value })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
        // redirijo a Home
        navigate('/')
    };

    // Guarda datos del mensaje en la BD
    const addMessageOnDB = async () => {
        const newMsg = {
            email: contactMsg.email,
            name: contactMsg.name,
            phone: contactMsg.phone,
            area: contactMsg.area,
            reason: contactMsg.reason,
            message: contactMsg.message,
            date: aDate
        }
        const usersFirebase = collection(db, 'mensajes')
        await addDoc(usersFirebase, newMsg)
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
        <div className="main-containerCF">
            <h1>Formulario de contacto</h1>
            <form onSubmit={handleSubmit}>
                <div className="elem-group">
                    <TextField
                        required
                        id="name"
                        name="name"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Nombre y Apellido"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="elem-group">
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        style={{ width: "400px", margin: "5px" }}
                        type="phone"
                        label="Telefono"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="elem-group">
                    <TextField
                        required
                        id="email"
                        name="email"
                        style={{ width: "400px", margin: "5px" }}
                        type="email"
                        label="Email"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="elem-group">
                    <TextField
                        id="area"
                        name="area"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Area"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="elem-group">
                    <TextField
                        id="reason"
                        name="reason"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Motivo"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="elem-group">
                    <TextField
                        required
                        id="message"
                        name="message"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Mensaje"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="elem-group">
                    <Button type='submit'
                        sx={[
                            { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white', width: '190px' },
                            { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                        ]}
                    > enviar
                    </Button>
                    <Button type='clear'
                        sx={[
                            { boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white', width: '190px' },
                            { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                        ]}
                    > limpiar
                    </Button>
                </div>
            </form>
            {openSnack && <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleClose}
                message={response}
                action={action}
                sx={{ height: "100%" }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            />
            }

        </div>
    )
}
export default ContactForm;