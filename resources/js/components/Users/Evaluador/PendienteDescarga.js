import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import swal from "sweetalert2";
import $ from "jquery";
import './PendienteDescarga.css';

class PendienteDescarga extends Component {
    constructor(props) {
        super(props);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            pendientedescarga_inicio_fin: [],
            idPendienteDescarga: null,
            idCheckbox: null,
            pendienteDescarga: {
                ObservacionInicio: null,
                ObservacionFin: null
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { idPendienteDescarga, idCheckbox, pendienteDescarga } = this.state;

        axios.put(`/pendiente_descarga/${idPendienteDescarga}`, {
            data: pendienteDescarga,
        }).then(data => {
            if (data.data === 'bien') {
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Agregado correctamente Pendiente Descarga (Inicio)',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                swal({
                    position: 'top-end',
                    type: 'error',
                    title: 'No se pudo agregar Pendiente Descarga (Inicio)',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            setTimeout(() => {
                $(idCheckbox).modal('hide');
                this.getData();
                this.clearState();
            }, 1800);
        }).catch(error => {
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error externo. Consulte con el administrador.',
                showConfirmButton: false,
                timer: 1500
            });
            
            setTimeout(() => {
                $(idCheckbox).modal('hide');
                this.getData();
                this.clearState();
            }, 1800);
        });
    }
    
    clearState() {
        var textInicio = document.getElementById('ObservacionInicio');
        var textoFin = document.getElementById('ObservacionFin');
        textInicio.value = null;
        textoFin.value = null;

        this.setState(prevState => ({
            idPendienteDescarga: null, 
            idCheckbox: null,
            pendienteDescarga: {
                ...prevState.pendienteDescarga,
                ObservacionInicio: null,
                ObservacionFin: null
            }
        }));
    }

    handleChange(e) {
        const { id, value } = e.target;

        this.setState(prevState => ({ 
            pendienteDescarga: {
                ...prevState.pendienteDescarga,
                [id]: value 
            }
        }));
    }

    handleChangeCheck(data, e) {
        let idPendienteDescarga = data.row._original.idPendienteDescarga;
        let id = data.column.id;
        var idCheckbox = null;
        
        if (id === 'checkInicio') {
            $('#exampleModal').modal('show');
            idCheckbox = '#exampleModal';
        } else {
            $('#exampleModal2').modal('show');
            idCheckbox = '#exampleModal2';
        } 

        this.setState({ idPendienteDescarga, idCheckbox });
    }

    getData() {
        axios.get('pendiente_descarga')
            .then(data => {
                this.setState({ pendientedescarga_inicio_fin: data.data.pendiente_descarga })
            }).catch(error => console.error(error));
    }

    dataReactTable() {
        return [{
            Header: 'Transportista',
            columns: [
                { Header: 'DNI', accessor: 'transportista' },
                { Header: 'Nombres Completos', accessor: 'full_name' },
            ]
        }, {
            Header: 'Vehículo',
            columns: [
                { Header: 'Tipo de Vehículo', accessor: 'descripcion_tipo_vehiculo' },
                { Header: 'Número de Placa', accessor: 'numPlaca' }
            ]
        }, {
            Header: 'Pendiente en Descarga',
            columns: [
                {
                    Header: 'Check de Inicio',
                    accessor: 'checkInicio',
                    Cell: props => <input type="checkbox" id={'Ini' + props.value} checked={props.value === 1} disabled={props.value === 1}
                        onChange={(e) => this.handleChangeCheck(props, e)} />
                },
                {
                    Header: 'Check de Culminación',
                    accessor: 'checkFin',
                    Cell: props => <input type="checkbox" id={'Fin' + props.value} checked={props.value === 1} disabled={props.value === 1}
                        onChange={(e) => this.handleChangeCheck(props, e)} />
                }
            ]
        }];
    }

    componentDidMount() {
        this.getData();
        this.timerID = setInterval(() => this.getData(), 5000);
    }

    componentWillMount() {
        clearInterval(this.timerID);
    }

    render() {
        const { pendientedescarga_inicio_fin } = this.state;

        return (
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Pendiente Descarga</h3>
                </div>
                <div className="card-body">
                    <ReactTable
                        data={pendientedescarga_inicio_fin}
                        columns={this.dataReactTable()}
                        defaultPageSize={5}
                        minRows={5}
                        previousText='Anterior'
                        nextText='Siguiente'
                        loadingText='Cargando...'
                        noDataText='No hay filas encontradas'
                        pageText='Página'
                        ofText='de'
                        rowsText='filas'
                    />
                </div>
                {/* Modal checkInicio */}
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Observaciones de Inicio</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Observaciones:</label>
                                        <textarea id="ObservacionInicio" className="form-control" onChange={this.handleChange} required 
                                            rows={3}>
                                        </textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Modal checkFin */}
                <div className="modal fade" id="exampleModal2" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel2">Observaciones de Culminación</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Observaciones:</label>
                                        <textarea id="ObservacionFin" className="form-control" onChange={this.handleChange} required 
                                            rows={3}>
                                        </textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PendienteDescarga;