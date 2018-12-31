import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';
import RegistroPendiente from './registro'

class ListaRegistroEntrada extends React.Component {
    constructor() {
      super();
      this.RegistroPendiente = React.createRef();
      this.state = {
        data: [],
        id:''
      };

      this.getDataTable();
    }

    getDataTable(){
        axios.get('/listaRegistroEntrada')
        .then(data => {
            this.setState({data: [...data.data.regEn]});
        }).catch(error => {
            console.error(error);
        });
    }
    editarRE(e){
        this.setState({
          id: e
        });
        this.RegistroPendiente.current.fillForm(e);
    }
    eliminarRE(e){
        // console.log(e);
        Swal({
            title: `Deseas eliminar este registro: ${e.id}?`,
            text: "No será posible revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, elíminalo!',
            cancelButtonText: 'No, cancelar!',
        }).then((result) => {
            if (result.value) {
                axios.get(`/eliminarRegEntrada/${e.id}`)
                    .then(data => {
                      console.log(data.data);
                    if(data.data=="OK"){
                        Swal(
                        'Eliminado!',
                         'El registro ha sido eliminado.',
                         'success'
                            );
                        setTimeout(() => {
                            // location.reload();
                            this.getDataTable();
                        }, 1500);
                    }else{
                      Swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Algo fue mal!',
                        footer: 'Consulte con el administrador sobre este problema.'
                      })
                    }
                    }).catch(error => {
                        console.log('Ocurrio un error ' + error);
                        this.$Progress.fail();
                    });
                 }
            });
    }
    render() {
      const { data } = this.state;
      return (
        <div className="col-md-12">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Lista de Registros</h3>
                </div>
                <div className="card-body">
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
                    id: "id",
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
                    Header: "Pesas",
                    accessor: "pesas",
                    filterable:true
                  },
                  {
                    Header: "Comite",
                    accessor: "comite",
                    filterable:true
                  },
                  {
                    Header: "Proveedor",
                    accessor: "proveedor",
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
                    Header: "Eliminar",
                    accessor: "tipo",
                    maxWidth: 100,
                    Cell: row =>(
                        <button className="form-control btn btn-danger" onClick={()=>this.eliminarRE(row.row)}>Eliminar</button>
                    )
                  },
                  {
                    Header: "Editar",
                    accessor: "tipo",
                    maxWidth: 100,
                    Cell: row =>(
                        <button className="form-control btn btn-primary" data-toggle="modal" 
                        data-target="#exampleModal" onClick={()=>this.editarRE(row.row)}>Editar</button>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
          
          {/* MODAL AGREGAR */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Editar Registro</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <RegistroPendiente ref={this.RegistroPendiente} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MODAL EDITAR */}
                </div>
            </div>
        </div>
      );
    }
  }
  export default ListaRegistroEntrada;