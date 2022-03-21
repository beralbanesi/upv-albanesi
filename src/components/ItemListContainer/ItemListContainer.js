import Card from "../Card/Card";

const  ItemListContainer = ({title, onTotalize}) => {

    return(
        <div className="container-cards">
            <h2>{title}</h2>
            <Card title={'Zapatillas grises'} price={'4990,50'} description={'Zapatillas Jaguar Deportiva'}  image={'./img/zapatillas1.jpg'} stock={6} onTotalize={onTotalize}/> 
            <Card title={'Zapatillas rosas'} price={'5999,50'} description={'Zapatillas Jaguar Deportiva color rosa'}  image={'./img/zapatillas2.jpg'} stock={4} onTotalize={onTotalize}/>
            <Card title={'Jogging gris'} price={'6100,00'} description={'Pantalon Jogging gris oscuro talle L'}  image={'./img/pantalon1.jpg'} stock={7} onTotalize={onTotalize}/> 
            <Card title={'Pantalon azul'} price={'7300,00'} description={'Pantalon deportivo azul talle XL'}  image={'./img/pantalon2.jpg'} stock={5} onTotalize={onTotalize}/>     
            <Card title={'Pantalon sport'} price={'8900,00'} description={'Pantalon sport vestir beige talle S'}  image={'./img/pantalon3.jpg'} stock={8} onTotalize={onTotalize}/>            
        </div>


    );





}
export default ItemListContainer;