import './FAQ.css';

const FaqPage = () => {
    return (
        <div className="main-container">
            <h1>Preguntas Frecuentes</h1>
        
            <h3>¿Cómo registrarse?</h3>
            <p>Selecciona la opción "Ingresar" del menú y luego presiona el enlace "Registrate acá". </p>
            <p> Completa los campos requeridos. ¡Listo!</p>

            <h3>¿Cómo comprar?</h3>
            <p>Agrega los productos que quieras, ve al carrito y presiona "Iniciar compra".</p>
            <p>Revisa la lista de productos y presiona "Completar compra". </p>
            <p>Si no iniciaste sesión se te solicitaran tus datos para que puedas finalizar la compra.</p>

            <h3>¿Dónde puedo ver mis órdenes?</h3>
            <p> Una vez que hayas iniciado sesión, selecciona el icono de la cuenta. Se abrira un menú </p>
            <p> en donde podrás seleccionar la opción "Mis ordenes".</p>

            <h3>¿Qué hago si quiero devolver un producto?</h3>
            <p> Selecciona la opción "Contacto" del menú.</p>
            <p> Completa el formulario indicando cual fue tu problema. En 72 hs hábiles recibirás una respuesta.</p>
        </div>
    )
}
export default FaqPage;