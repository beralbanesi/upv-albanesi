import Card from "../Card/Card";

const  ItemListContainer = ({title}) => {

    return(
        <div className="container-cards">
            <h2>{title}</h2>
            <Card title={'Zapatillas grises'} price={'4990,50'} description={'Zapatillas Jaguar Deportiva'}  image={'./img/zapatillas1.jpg'}/> 
            <Card title={'Zapatillas rosas'} price={'5999,50'} description={'Zapatillas Jaguar Deportiva color rosa'}  image={'./img/zapatillas2.jpg'}/>
            <Card title={'Jogging gris'} price={'6100,00'} description={'Pantalon Jogging gris oscuro talle L'}  image={'./img/pantalon1.jpg'}/> 
            <Card title={'Pantalon azul'} price={'7300,00'} description={'Pantalon deportivo azul talle XL'}  image={'./img/pantalon2.jpg'}/>     
            <Card title={'Pantalon sport'} price={'8900,00'} description={'Pantalon sport vestir beige talle S'}  image={'./img/pantalon3.jpg'}/>            
        </div>


    );





}
export default ItemListContainer;