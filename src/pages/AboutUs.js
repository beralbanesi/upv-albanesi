import "./AboutUs.css"

const FaqPage = () => {
    return(
        <div className="main-container">
            <h1>Sobre nuestro emprendimiento</h1>
            <div className="wrapperAU">
                <div className="elementAU">
                    <img className="logo-imgAU" alt='Sobre nosotros...' src="./img/logo512.png"/>
                </div>
                <div className="elementAU">
                    <p> <b>Usalo-Publicalo-Vendelo</b> nació en el año 2020 durante la pandemia COVID-19 ante 
                    la imposibilidad de la gente de salir de sus hogares y la necesidad de vender pertenencias 
                    que ya no estaban utilizando. 
                    Por medio de <b>Usalo-Publicalo-Vendelo</b> se han realizado
                    mas de 530.000 ventas de artículos usados. La plataforma cuenta en estos momentos con mas 
                    de 70.000 usuarios registrados.</p>
                </div>
            </div>
        </div>   
    )   
    }
    export default FaqPage;