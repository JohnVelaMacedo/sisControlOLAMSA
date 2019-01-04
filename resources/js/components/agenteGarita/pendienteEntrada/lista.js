import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';
import $ from "jquery";

class ListaPendienteEntrada extends React.Component{

    constructor(){
        super();
        this.state={
            data: [],
            id:''
        }
        axios.get('/listaPendienteEntradaSalida')
        .then(data => {
            this.setState({data: [...data.data.regEn]});
        }).catch(error => {
            console.error(error);
        });
        this.getDataTable();
    }

    getDataTable(){
        setInterval(()=>{
        axios.get('/listaPendienteEntradaSalida')
        .then(data => {
            this.setState({data: [...data.data.regEn]});
        }).catch(error => {
            console.error(error);
        });
        },5000)
    }   

    penEntrada(e,idRegistro,idPendiente){
        // console.log(e.target.id,idRegistro);
        let idInput=e.target.id;
        
        let Pendiente={
            idRegEntrada:idRegistro,
            idPendiente:idPendiente,
            check:e.target.checked,
            observaciones:''
        };
        Swal({
            title: '<h3><strong>Ingrese Observación</strong></h3>',
            input: 'text',
            showCloseButton: true,
            focusConfirm: false,
          }).then((d)=>{
              if(d.value){
                $('#'+idInput).prop('disabled',true);
                Pendiente.observaciones=d.value;
                axios.post('/checkInicio', {
                    pendiente: Pendiente
                    })
                    .then(data => {
                        if (data.data == 'OK') {
                            Swal({
                                position: 'top-end',
                                type: 'success',
                                title: 'Datos ingresados correctamente',
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setTimeout(() => {
                            }, 1500);
                        } else {
                            Swal({
                                position: 'top-end',
                                type: 'error',
                                title: 'No se pudo agregar, comuníquese con el Administrador',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    }).catch(error => {
                        Swal({
                            position: 'top-end',
                            type: 'error',
                            title: 'Sucedió un error. Asegurese de rellenar todos los campos del formulario!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        console.log(`Error: ${error}`);
                    });  
              }else{
                $('#'+idInput).prop('checked',false);
              }
          });
    }

    penSalida(e,idRegistro,idPendiente){
        // console.log(e.target.checked);
        let idInput=e.target.id;
        let PendienteSal={
            idRegEntrada:idRegistro,
            idPendiente:idPendiente,
            check:e.target.checked,
            observaciones:''
        };
        Swal({
            title: '<h3><strong>Ingrese Observación</strong></h3>',
            input: 'text',
            showCloseButton: true,
            focusConfirm: false,
          }).then((d)=>{
              if(d.value){
                $('#'+idInput).prop('disabled',true);
                PendienteSal.observaciones=d.value;
                axios.post('/checkFin', {
                    pendiente: PendienteSal
                    })
                    .then(data => {
                        if (data.data == 'OK') {
                            Swal({
                                position: 'top-end',
                                type: 'success',
                                title: 'Datos ingresados correctamente',
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setTimeout(() => {
                            }, 1500);
                        } else {
                            Swal({
                                position: 'top-end',
                                type: 'error',
                                title: 'No se pudo agregar, comuníquese con el Administrador',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    }).catch(error => {
                        Swal({
                            position: 'top-end',
                            type: 'error',
                            title: 'Sucedió un error. Asegurese de rellenar todos los campos del formulario!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        console.log(`Error: ${error}`);
                    });  
              }else{
                $('#'+idInput).prop('checked',false);
              }
          });
    }

    render(){
        const { data } = this.state;
        return(
            <div className="col-md-12">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Pendiente Entrada - Salida</h3>
                </div>
                <div className="card-body"></div>
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
export default ListaPendienteEntrada;