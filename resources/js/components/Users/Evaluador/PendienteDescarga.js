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
        this.handleBlur = this.handleBlur.bind(this);
        this.handleEditPendiente = this.handleEditPendiente.bind(this);
        this.state = {
            tipo_vehiculo: [],
            fecha_hora_descarga: [],
            persona: [],
            fecha_hora_descarga_datos: { 
                observaciones: null,
                fechaReg: null,
                horaReg: null,
                transportista: null,
                tipoVehiculo: null,
                placa: null
            },
            errorPlaca: ""
        };
    }

    handleEditPendiente(data) {
        console.log(data);
        $('#editModal').modal('show');
    }

    handleBlur(e) {
        var value = e.target.value;
        const rule = /^(([A-Z]{3,3})\-([0-9]{3,4}))$/;
        const valid = rule.test(value);

        if (valid) {
            $('#button_submit').prop('disabled', false);
            this.setState({errorPlaca: ""});
        } else {
            $('#button_submit').prop('disabled', true);
            $('#errorPlaca').css("color", "red");
            this.setState({errorPlaca: "Asegurese de cumplir el formato indicado(XXX-123)"});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var formSubmit = document.getElementById('formSubmit');

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
                formSubmit.reset();
                this.setState(prevState => ({
                    fecha_hora_descarga_datos: {
                        observaciones: null,
                        fechaReg: null,
                        horaReg: null,
                        transportista: null,
                        tipoVehiculo: null,
                        placa: null
                    }
                }));
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
                    persona: data.data.persona,
                    fecha_hora_descarga: data.data.fecha_hora_descarga
                });
            }).catch(error => console.error(error));
        }
        
    render() {
        const { tipo_vehiculo, persona, fecha_hora_descarga } = this.state;

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
        const columns = [{
            Header: 'PLACA',
            accessor: 'placa'
        }, {
            Header: 'TRANSPORTISTA',
            columns: [
                {
                    Header: 'DNI',
                    accessor: 'transportista'
                }, 
                {
                    Header: 'Nombres Completos',
                    accessor: 'full_name'
                }
            ]
        }, {
            Header: 'VEHICULO',
            columns: [
                {
                    Header: 'Tipo',
                    accessor: 'descripcion'
                }
            ]
        }, {
            Header: 'OBSERVACIONES',
            accessor: 'observaciones'
        }, {
            Header: 'FECHA/HORA (INICIO)',
            columns: [
                {
                    Header: 'Fecha',
                    accessor: 'fechaReg'
                }, 
                {
                    Header: 'Hora',
                    accessor: 'horaReg'
                }
            ]
        }, {
            Header: 'FECHA/HORA (FIN)',
            columns: [
                {
                    Header: 'Fecha',
                    accessor: 'fechafinReg',
                    Cell: props => props.value ? props.value : "Datos faltantes"
                }, 
                {
                    Header: 'Hora',
                    accessor: 'horafinReg',
                    Cell: props => props.value ? props.value : "Datos faltantes"
                }
            ]
        }, {
            Header: 'ESTADO',
            accessor: 'checkInicioFin',
            Cell: props => {
                return props.value === 1 ? (
                    <p>
                        Iniciado
                        <i className="fa fa-circle" style={{color: 'green', marginLeft: '5px'}} aria-hidden="true"></i>
                    </p>
                ) : (
                    <p>
                        Terminado
                        <i className="fa fa-circle" style={{color: 'red', marginLeft: '5px'}} aria-hidden="true"></i>
                    </p>
                );
            }
        },{
            Header: 'ACCIONES',
            accessor: 'id_pendienteDescarga',
            Cell: props => {
                return (
                    <a style={{cursor: 'pointer', color: 'green'}} onClick={() => this.handleEditPendiente(props.value)}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                );
            }
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
                        data={fecha_hora_descarga} 
                        columns={columns} 
                        loadingText="Cargando..."
                        noDataText="No hay filas encontradas"
                        previousText='Anterior'
                        nextText='Siguiente'
                        pageText='Página'
                        ofText="de"
                        rowsText="filas" 
                        defaultPageSize={5}
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
                                    <form onSubmit={this.handleSubmit} id="formSubmit"> 
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Placa de Vehículo:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" name="" id="placa" onChange={this.handleChange} 
                                                    required placeholder="Ingrese el número de la placa" minLength={6}
                                                    maxLength={7} onBlur={this.handleBlur} />
                                                <small id="errorPlaca">{this.state.errorPlaca}</small>
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
                                                onChange={this.handleChange} maxLength={50} >
                                            </textarea>
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                            <button type="submit" id="button_submit" className="btn btn-primary ml-2">Guardar cambios</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MODAL EDITAR */}
                    <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Agregar Pendiente de Fin de Descarga</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit} id="formEditSubmit">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Fecha de Descarga (Fin):</label>
                                            <div className="col-md-8">
                                                <input type="date" className="form-control" id="fechaFinReg" min="2018-12-29" required 
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Hora de Descarga (Fin):</label>
                                            <div className="col-md-8">
                                                <input type="time" className="form-control" min="00:00" required onChange={this.handleChange}
                                                    id="horaFinReg" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Observaciones</label>
                                            <textarea className="form-control" id="observaciones" placeholder="Ingrese una observación"
                                                onChange={this.handleChange} maxLength={50} >
                                            </textarea>
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                            <button type="submit" id="button_edit_submit" className="btn btn-primary ml-2">Guardar cambios</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PendienteDescarga;