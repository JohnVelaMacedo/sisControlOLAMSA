import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import swal from "sweetalert2";
import $ from "jquery";
import './PendienteDescarga.css';

class PendienteDescarga extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            tipo_vehiculo: [],
            fecha_hora_descarga: [],
            pendiente_descarga: [],
            persona: [],
            fecha_hora_descarga_datos: { 
                observaciones: null,
                fechaReg: null,
                horaReg: null,
                transportista: null,
                tipoVehiculo: null,
                placa: null
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('fecha_hora_descarga', {
            fecha_hora_descarga: this.state.fecha_hora_descarga_datos
        }).then(data => {
            if (data.data === 'bien') {
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Datos agregados correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                swal({
                    position: 'top-end',
                    type: 'error',
                    title: 'No se pudo agregar los datos',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            setTimeout(() => {
                $('#exampleModal').modal('hide');
            }, 1800);
        }).catch(error => {
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Fallo externo. Comuníquese con el administrador',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                $('#exampleModal').modal('hide');
            }, 1800);
        });
    }

    handleChange(e) {
        let nombre = e.target.id;
        let valor = e.target.value;

        this.setState(prevState => ({
            fecha_hora_descarga_datos: {
                ...prevState.fecha_hora_descarga_datos,
                [nombre]: valor
            }
        }));
    }

    componentDidMount() {
        axios.get('fecha_hora_descarga')
            .then(data => {
                this.setState({ 
                    tipo_vehiculo: data.data.tipo_vehiculo,
                    pendiente_descarga: data.data.pendiente_descarga,
                    fecha_hora_descarga: data.data.fecha_hora_descarga,
                    persona: data.data.persona,
                });
            }).catch(error => console.error(error));
    }

    render() {
        const { tipo_vehiculo, pendiente_descarga, fecha_hora_descarga, persona } = this.state;
        
        // Lista de Tipos de Vehículos
        const lista_tipo_vehiculos = tipo_vehiculo.length ?
            (
                <select className="form-control" required id="tipoVehiculo" onChange={this.handleChange}>
                    <option value="">Seleccione</option>
                    {tipo_vehiculo.map(e => <option key={e.id} value={e.id}>{e.descripcion}</option>)}
                </select>
            ) : (
                <select className="form-control">
                    <option>No hay datos disponibles</option>
                </select>
            );
        
        // Lista de Transportistas
        const lista_transportistas = persona.length ? 
            (
                <select className="form-control" required id="transportista" onChange={this.handleChange}>
                    <option value="">Seleccione</option>
                    { persona.map(e => <option value={e.dni} key={e.id}>{e.nombre} {e.apellidos}</option>) }
                </select>
            ) : (
                <select>
                    <option>No hay datos disponibles</option>
                </select>
            );
        
        // React Table
        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23
            }
        }, {
            name: 'Tinna Turner',
            age: 28,
            friend: {
                name: 'Jacob Kowalski',
                age: 21
            }
        }];

        const columns = [{
            Header: 'PLACA'
        }, {
            Header: 'TRANSPORTISTA'
        }, {
            Header: 'TIPO DE VEHICULO'
        }, {
            Header: 'OBSERVACIONES'
        }, {
            Header: 'FECHA/HORA (INICIO)'
        }, {
            Header: 'FECHA/HORA (FIN)'
        }, {
            Header: 'ESTADO'
        },{
            Header: 'ACCIONES'
        }]

        return (
            <div className="card">
                <div className="card-header">
                    <h3>
                        <button type="button" id="add_descarga" className="btn btn-success" data-toggle="modal" 
                            data-target="#exampleModal">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        Agregar Inicio de Descarga
                    </h3>
                </div>
                <div className="card-body">
                    <ReactTable 
                        data={data} 
                        columns={columns} 
                        loadingText="Cargando..."
                        noDataText="No hay filas encontradas"
                        previousText='Anterior'
                        nextText='Siguiente'
                        pageText='Página'
                        ofText="de"
                        rowsText="filas" 
                    />
                    
                    {/* MODAL AGREGAR */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Agregar Pendiente de Inicio de Descarga</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit}> 
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Placa de Vehículo:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" name="" id="placa" onChange={this.handleChange} 
                                                    required placeholder="Ingrese el número de la placa" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Tipo de Vehículo:</label>
                                            <div className="col-md-8">
                                                {lista_tipo_vehiculos}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Transportista:</label>
                                            <div className="col-md-8">
                                                {lista_transportistas}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Fecha de Descarga (Inicio):</label>
                                            <div className="col-md-8">
                                                <input type="date" className="form-control" id="fechaReg" min="2018-12-29" required 
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Hora de Descarga (Inicio):</label>
                                            <div className="col-md-8">
                                                <input type="time" className="form-control" min="00:00" required onChange={this.handleChange}
                                                    id="horaReg" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Observaciones</label>
                                            <textarea className="form-control" id="observaciones" placeholder="Ingrese una observación"
                                                onChange={this.handleChange}>
                                            </textarea>
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                            <button type="submit" className="btn btn-primary ml-2">Guardar cambios</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MODAL EDITAR */}
                </div>
            </div>
        );
    }
}

export default PendienteDescarga;