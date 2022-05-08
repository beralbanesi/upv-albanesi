import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import db from "../../Utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddProductForm = () => {
    const [value, setValue] = useState('')
    //snack bar
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleChange = ({ target: { name, value } }) => {
        setValue({ ...value, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newProduct = {
            category: e.target.category.value,
            title: e.target.title.value,
            colors: [e.target.color.value],
            description: e.target.description.value,
            image: e.target.imageName.value,
            price: e.target.price.value,
            sizes: [e.target.size.value],
            stars: e.target.stars.value,
            stock: e.target.stock.value
        }
        pushProduct(newProduct);
        setOpenSnack(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const pushProduct = async (aProduct) => {
        const productsFirebase = collection(db, 'productos')
        await addDoc(productsFirebase, aProduct)

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
            <Typography variant="h5">Agregar producto</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="category"
                        name="category"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Categoria"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
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
                        id="color"
                        name="color"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Color"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="description"
                        name="description"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Descripcion"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="imageName"
                        name="imageName"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Nombre imagen"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="price"
                        name="price"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Precio"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="size"
                        name="size"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Tamaño"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                    <div>
                        <TextField
                            sx={{ width: '800px' }}
                            id="stars"
                            name="stars"
                            style={{ width: "400px", margin: "5px" }}
                            type="number"
                            label="Puntuacion"
                            variant="outlined"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ width: '800px' }}
                            id="stock"
                            name="stock"
                            style={{ width: "400px", margin: "5px" }}
                            type="number"
                            label="Stock"
                            variant="outlined"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
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
                message="El producto fue agregado exitosamente"
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
export default AddProductForm;