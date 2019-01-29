import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';
import $ from "jquery";

class ListaPendienteEntrada extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data: [],
            id:''
        }
        this.penEntrada = this.penEntrada.bind(this);
        this.penSalida = this.penSalida.bind(this);
        this.llamar = this.llamar.bind(this);
    }

    componentDidMount() {
        this.getDataTable();
        this.timerID = setInterval(() => this.getDataTable(), 5000);
    }

    componentWillMount() {
        clearInterval(this.timerID);
    }
    getDataTable(){
        axios.get('/listaPendienteEntradaSalida')
        .then(data => {
            this.setState({data: data.data.regEn});
        }).catch(error => {
            console.error(error);
        });
    }   

    llamar(e,id){
        // console.log(e.target.id);
        var op=e.target.checked?'PENDIENTE':'ESPERA';
        axios.post(`/llamarTicket/${id}`,{opcion:op}).
        then(data=>{
            // console.log(data);
        });
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
            //   console.log(d.value);
              if(d.value || d.value==''){
                $('#'+idInput).prop('disabled',true);
                Pendiente.observaciones=(d.value==''?' -- ':d.value);
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
                        } else {
                            Swal({
                                position: 'top-end',
                                type: 'error',
                                title: 'No se pudo agregar, comuníquese con el Administrador',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                        this.getDataTable();
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

    penSalida(r,e,idRegistro,idPendiente){
        console.log(r);
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
              if(d.value || d.value==''){
                //$('#'+idInput).prop('disabled',true);
                PendienteSal.observaciones=(d.value==''?' -- ':d.value);
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
                        } else {
                            Swal({
                                position: 'top-end',
                                type: 'error',
                                title: 'No se pudo agregar, comuníquese con el Administrador',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                        this.getDataTable();
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

    rows(){
        return [
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
                    Header: "Observaciones",
                    accessor: "observaciones",
                    filterable:false
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
                    Cell: row =><input className="form-control" type="checkbox" id={'in-'+row.row.idPendiente} disabled={row.row.checkIn==1?true:false} onChange={(e)=>{this.penEntrada(e,row.row._original.id,row.row._original.idPendiente)}} checked={row.row.checkIn==1?true:false} />       
                },
                {
                    Header: "Salida",
                    accessor: "checkOut",
                    maxWidth: 100,
                    Cell: row =><input className="form-control" type="checkbox" id={'out-'+row.row.idPendiente} disabled={row.row.checkOut==1?true:false} onChange={(e)=>{this.penSalida(row.row,e,row.row._original.id,row.row._original.idPendiente)}} checked={row.row.checkOut==1?true:false} />
                }
                ]
            },
              {
                Header:"Ticket",
                columns:[
                  {
                    Header:"Llamar",
                    accessor: "estado",
                    maxWidth: 100,
                    Cell: row1 =><input className="form-control" type="checkbox" id={'call-'+row1.row.idPendiente} onChange={(e)=>{this.llamar(e,row1.row.idPendiente)}} disabled={row1.row.checkIn==1?true:false} checked={row1.row._original.estado=='PENDIENTE'?true:false}/>
                  }
                ]
              }
            ]
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
                    columns={this.rows()}
                    defaultPageSize={20}
                    minRows={20}
                    className="-striped -highlight"
                    previousText='Anterior'
                    nextText='Siguiente'
                    loadingText='Cargando...'
                    noDataText='No hay filas encontradas'
                    pageText='Página'
                    ofText='de'
                    rowsText='filas'
                />
                </div>
            </div>
        );
    }
}
export default ListaPendienteEntrada;