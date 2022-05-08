import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import db from "../../Utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddCategoryForm = () => {
    const [value, setValue] = useState('')
    //snack bar
    const [openSnack, setOpenSnack] = React.useState(false); 

    const handleChange = ({ target: { name, value } }) => {
        setValue({ ...value, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newCategory = {
            name: e.target.category.value,
        }
        pushCategory(newCategory);
        setOpenSnack(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const pushCategory = async (aCat) => {
        const catsFirebase = collection(db, 'categorias')
        await addDoc(catsFirebase, aCat)       
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
            <Typography variant="h5">Agregar categoria</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="category"
                        name="category"
                        style={{ width: "400px", margin: "5px" }}
                        type="text"
                        label="Nombre categoria"
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
                message="La categoria fue agregada exitosamente"
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
export default AddCategoryForm;