import './Error.css';

const ErrorPage = () => {
    return (
        <div className="main-container">
            <h1>La pagina a la que se intenta acceder no existe.</h1>            
            <div className='img-container'>
                <img src="../img/error404.png" alt='Error404'/>
            </div>
        </div>
    )
}
export default ErrorPage;