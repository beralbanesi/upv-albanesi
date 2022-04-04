import "./ContactForm.css";
import { useState } from "react";

const ContactForm = () => {

    const [value,setValue]= useState('')

    const handleSubmit = (e) =>{
        console.log("Se envió el formulario de contacto.") 
    }

    return (
        <div className="main-container">
        
        <form onSubmit={(handleSubmit)} id="form">
        <div >
           <h2 className="title">Complete el formulario</h2>
         </div>
        <div className="wrapper">             
            <div className="elem-group">
                <label>Nombre: </label>
            </div>
            <div  className="elem-group">
                <input type="text" id="name" name="name" onChange={(e) => {setValue(e.target.value)}} placeholder="Nombre"  required/>
            </div>
            <div className="elem-group">
            <label >Apellido: </label>
            </div>
            <div  className="elem-group">
            <input type="text" id="surname" name="surname" placeholder="Apellido" required/>
            </div>
            <div className="elem-group">
            <label>Telefono: </label>
            </div>
            <div  className="elem-group">
            <input type="tel" id="phone" name="phone" placeholder="(Código de área) Número" required/>
            </div>
            <div className="elem-group">
            <label>Email: </label>
            </div>
            <div  className="elem-group">
            <input type="email" id="email" name="email" placeholder="mail@email.com" required/>
            </div>
            <div className="elem-group">
            <label >Área: </label>
            </div>
            <div  className="elem-group">
            <select id="selection" name="selection" required>
                <option value="">Selecciona un área</option>
                <option value="clothes">Ropa</option>
                <option value="shoes">Calzado</option>
                <option value="accesories">Accesorios</option>
            </select>
            </div>
            <div className="elem-group">
                <label>Motivo: </label>
            </div>
            <div  className="elem-group">
                <input type="text" id="title" name="email_title" required placeholder="Problema/Consulta" />
            </div>
            <div className="elem-group">
                <label>Solicitud: </label>
            </div>
            <div  className="elem-group">
                <textarea id="message" name="message" placeholder="Escribe tu mensaje aquí." required ></textarea>
            </div>
            <div  className="elem-group">
                <button className="form-btn" type="submit" >Enviar</button>
            </div>
            <div  className="elem-group">
                <button className="form-btn" type="reset" >Limpiar</button>
            </div>
        </div>
        </form>
        </div>
    )
}
export default ContactForm;