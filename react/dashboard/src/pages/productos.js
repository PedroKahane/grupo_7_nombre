import React, {Component} from 'react'
import '../App.css';
import CardMAin from '../components/Card-Main';
import UltimoProducto from '../components/ultimoProducto';
import PieChart from '../components/Pie';
import ListadoProductos from '../components/ListadoProductos';

class Productos extends Component {
    constructor(props){
        super(props)
        this.state = {
            countProducts: 0,
            countProductosEnOferta: 0,
            countProductosDestacados: 0,
            listadoProductos: [],
            lastProduct: [],
            countByColor: [],

        }
    }
    apiCall(url, consecuencia){
        fetch(url)
        .then(response => response.json())
        .then(data => consecuencia(data))
        .catch(error => console.log(error))
    }
    componentDidMount(){
        this.apiCall(`http://localhost:3001/products`, this.mostrarCountProducts)
        this.apiCall(`http://localhost:3001/products`, this.mostrarLastProduct)
        this.apiCall(`http://localhost:3001/products`, this.mostrarProductosEnOferta)
        this.apiCall(`http://localhost:3001/products`, this.mostrarProductosDestacados)
        this.apiCall(`http://localhost:3001/products`, this.mostrarListadoProductos)
        
        
    }
    mostrarCountProducts = (data) => {
        this.setState({
            countProducts : data.count,
            countByColor: data.countByColor
        })
    }
    mostrarProductosEnOferta = (data) => {
        this.setState({
            countProductosEnOferta: data.countProductosEnOferta
        })
    }
    mostrarProductosDestacados = (data) => {
        this.setState({
            countProductosDestacados: data.countProductosDestacados
        })
    }
    mostrarListadoProductos = (data) => {
        this.setState({
            listadoProductos: data.data.products
        })
        console.log(this.state.listadoProductos);
    }
    mostrarLastProduct = (data) => {
        this.setState({
            lastProduct : data.lastProduct
        })
        console.log(this.state.lastProduct);
    }
    componentDidUpdate(){

    }
    
    render() {
        const data2 = {
            labels: this.state.countByColor.map((element) => element.nombre),
            datasets: [
              {
                label: 'Cantidad de productos',
                data :  this.state.countByColor.map((element) => element.cantidad),
                backgroundColor: this.state.countByColor.map((element) => element.paletaRgba),
                borderColor: this.state.countByColor.map((element) => element.paleta),
                borderWidth: 1,
              },
            ],
          };
        return(
            <div className="flex">
                <CardMAin
                titulo = "Cantidad de productos: "
                number = {this.state.countProducts}
                svg="fas fa-archive"
                ></CardMAin>
                <CardMAin
                titulo = "Cantidad de productos en oferta: "
                number = {this.state.countProductosEnOferta}
                svg="fas fa-tags"
                ></CardMAin>
                <div className="ultimasVentas">
                    <div className="flex_center">
                    <i className="fas fa-basketball-ball"></i>
                    <p className="tituloVentas">Último producto creado: </p>
                    </div>
                    {this.state.lastProduct.map((element) => {
                        return <UltimoProducto
                        jugador ={element.jugador}
                        equipo ={element.equipo}
                        precio ={element.precio}
                        color ={element.color}
                        imagen = {element.imagenEspalda}
                        ></UltimoProducto>
                    })}
                </div>
                <CardMAin
                titulo = "Cantidad de productos destacados: "
                number = {this.state.countProductosDestacados}
                svg="fas fa-bolt"
                ></CardMAin>
                <div className="ultimasVentas">
                    <div className="flex_center">
                    <i className="fas fa-tshirt"></i>
                    <p className="tituloVentas">Listado de productos: </p>
                    </div>
                    <div className="content_subtitulo_listado">
                    <h2 className="titulo_2">ID</h2>
                    <h2 className="titulo_2">Jugador</h2>
                    <h2 className="titulo_2">Color</h2>
                    </div>
                    {this.state.listadoProductos.map((element) => {
                        return <ListadoProductos
                        id ={element.id}
                        jugador ={element.jugador}
                        color ={element.color}
                        ></ListadoProductos>
                    })}
                </div>
                <PieChart
                data = {data2}
                ></PieChart>
            </div>
        )
    }
    
}


export default Productos