import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { getMessages } from "../../Utils/data";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const ViewContactMessages = () => {

    const [messages, setMessages] = useState([])

    // en montaje
    useEffect(() => {
        getMessages(10).then((data) => {
            // data.filter(function (item) {
            //     return (item.date > 1) ;
            //   })
            setMessages(data)
        }).finally(() => { })
    }, [])

    const StyledPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        maxWidth: 400,
        color: theme.palette.text.primary,
    }));
    return (
        <div>
            <Typography variant="h5">Mensajes de contacto</Typography>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>


                {messages.map((msg, i) => {
                    return (
                        <StyledPaper
                            key={`sp${i}`}
                            sx={{
                                my: 1,
                                mx: 'auto',
                                p: 2,
                                minHeight: '120px'
                            }}
                        >
                            <Grid container wrap="nowrap" spacing={2} key={`grid${i}`}>
                                <Grid item xs key={i} sx={{ textAlign: 'left' }}>
                                    <Typography>Fecha: {msg.date}</Typography>
                                    <Typography>Nombre: {msg.name}</Typography><Typography>Email:{msg.email}</Typography>
                                    <Typography>Motivo: {msg.reason}</Typography>
                                    <Typography>Mensaje: {msg.message}</Typography>

                                </Grid>
                            </Grid>
                        </StyledPaper>
                    )
                })
                }



            </Box>
        </div>
    )
}
export default ViewContactMessages;