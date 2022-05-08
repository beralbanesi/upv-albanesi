import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import db from "../../Utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { getRoutes } from "../../Utils/data";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddRouteForm = () => {
    const [value, setValue] = useState('')
    //snack bar
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleChange = ({ target: { name, value } }) => {
        setValue({ ...value, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // leo las rutas desde BD 
        getRoutes().then((data) => {
            let newPos = Math.max.apply(Math, data.map(function (aRoute) { return aRoute.position; })) + 1
            let newRoute = {
                title: e.target.title.value,
                url: e.target.url.value,
                position: newPos
            }
            pushRoute(newRoute);
            setOpenSnack(true);
        }).finally(() => { })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const pushRoute = async (aRoute) => {
        const routesFirebase = collection(db, 'rutas')
        await addDoc(routesFirebase, aRoute)
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
        <div>
            <Typography variant="h5">Agregar ruta</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="title"
                        name="title"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Titulo"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="url"
                        name="url"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Url"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <Button type='submit'
                        sx={[
                            { width: '190px', boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                            { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                        ]}
                    > enviar </Button>
                    <Button type='reset'
                        sx={[
                            { width: '190px', boxShadow: '1px 1px 5px', margin: 1, textTransform: 'uppercase', cursor: 'pointer', backgroundColor: '#1F4374', color: 'white' },
                            { '&:hover': { backgroundColor: '#107BD4', transform: 'scale(1.03)' } }
                        ]}
                    > limpiar </Button>
                </div>
            </form>
            {openSnack && <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleClose}
                message="La ruta fue agregada exitosamente"
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
export default AddRouteForm;