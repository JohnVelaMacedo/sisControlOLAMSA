import React, { Component } from "react";
import axios from "axios";

class InicioDescarga extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            tipo_vehiculo: []
        };
    }

    handleChange(e) {
        console.log(e.target.id);
    }

    componentDidMount() {
        axios.get('pendiente_descarga')
            .then(data => {
                this.setState({tipo_vehiculo: data.data.tipo_vehiculo});
            }).catch(error => {
                console.error(error);
            });
    }

    render() {
        const {tipo_vehiculo} = this.state;
        const lista_tipo_vehiculos = tipo_vehiculo.length ? 
            (
                <select className="form-control" required id="tipo_vehiculo" onChange={this.handleChange}>
                    <option value="">Seleccione</option>
                    { tipo_vehiculo.map(e => <option key={e.id} value={e.id}>{e.descripcion}</option>) }    
                </select>
            ) : (
                <select className="form-control">
                    <option>No hay datos disponibles</option>
                </select>
            );
        return (
            <div className="card">
                <div className="card-header">Agregar Inicio de Descarga</div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label>Placa de Vehículo</label>
                                <input type="text" className="form-control" name="" id="placa" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Tipo de Vehículo</label>
                                {lista_tipo_vehiculos}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );  
    }
}

export default InicioDescarga;