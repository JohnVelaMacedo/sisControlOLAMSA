import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';
import $ from "jquery";


//para el tag input: al presionar enter o coma agregue el tag
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
//-------------------

class ListaReporte extends React.Component{

    constructor(){
        super();
        this.state={
            data: [],
            id:'',
            tipoVehiculo:[],
            comite:[],
            proveedor:[],
            tags: [
            ],
            suggestions: []
        }

        this.getDatos();

    }

    getDatos(){
        axios.get('/listaComite')
        .then(data => {
            this.setState({comite: [...data.data.comite]});
        }).catch(error => {
            console.error(error);
        });
        axios.get('/listaProveedor')
        .then(data => {
            this.setState({proveedor: [...data.data.proveedor]});
        }).catch(error => {
            console.error(error);
        });
        axios.get('/listaTipoVehiculo')
        .then(data => {
            console.log(data.data.tv);
            this.setState({tipoVehiculo: [...data.data.tv]});
        }).catch(error => {
            console.error(error);
        });
    }

    render(){
        const { data } = this.state;
        const { tags } = this.state;
        let {rows}=this.state;
        return(
            <div className="col-md-12">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Reporte</h3>
                </div>
                <div className="card-body"></div>
                <div>
                
                </div>
                <ReactTable
                    data={data}
                    columns={[
                    {
                        Header: "Código",
                        columns: [
                        {
                            Header: "ID",
                            filterable:true,
                            maxWidth: 50,
                            id: "idPendiente",
                            accessor: d => d.id
                        }
                        ]
                    },
                    {
                        Header: "Información",
                        columns: [
                        {
                            Header: "Vehículo",
                            accessor: "vehiculo",
                            filterable:true
                        },
                        {
                            Header: "Placa",
                            accessor: "placa",
                            filterable:true
                        },
                        {
                            Header: "Transportista",
                            accessor: "transportista",
                            filterable:true
                        },
                        {
                            Header: "Observaciones",
                            accessor: "observaciones",
                            filterable:true
                        },
                        ]
                    },
                    {
                        Header: 'Acciones',
                        columns: [
                        
                        {
                            Header: "Entrada",
                            accessor: "checkIn",
                            maxWidth: 100,
                            Cell: row =>(
                                <div>
                                    {/* <label className="form-check-label">{row.row._original.checkIn?'true':'false'}</label> */}
                                    <input className="form-control" type="checkbox" id={'in-'+row.row.idPendiente} disabled={row.row._original.checkIn} onClick={(e)=>{this.penEntrada(e,row.row._original.id,row.row._original.idPendiente)}} defaultChecked={row.row._original.checkIn} />
                                </div>
                            )
                        },
                        {
                            Header: "Salida",
                            accessor: "checkOut",
                            maxWidth: 100,
                            Cell: row =>(
                                <div>
                                    <input className="form-control" type="checkbox" id={'out-'+row.row.idPendiente} disabled={row.row._original.checkOut} onClick={(e)=>{this.penSalida(e,row.row._original.id,row.row._original.idPendiente)}} defaultChecked={row.row._original.checkOut} />
                                </div>
                            )
                        }
                        ]
                    }
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
                </div>
            </div>
        );
    }
}
export default ListaReporte;