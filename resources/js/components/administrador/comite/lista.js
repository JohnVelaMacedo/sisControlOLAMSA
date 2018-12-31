import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';
import RegistrarComite from './registrar'

class ListaComite extends React.Component {
    constructor() {
      super();
      this.RegistrarComite = React.createRef();
      this.state = {
        data: [],
        id:''
      };

      axios.get('/listaComite')
        .then(data => {
            this.setState({data: [...data.data.comite]});
        }).catch(error => {
            console.error(error);
        });

    }
    editarC(e){
        this.setState({
          id: e
        });
        this.RegistrarComite.current.fillForm(e);
    }
    eliminarC(e){
        // console.log(e);
        Swal({
            title: `Deseas eliminar este comite: ${e.nombre}?`,
            text: "No será posible revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, elíminalo!',
            cancelButtonText: 'No, cancelar!',
        }).then((result) => {
            if (result.value) {
                axios.get(`/eliminarcomite/${e.id}`)
                    .then(data => {
                      console.log(data.data);
                    if(data.data=="OK"){
                        Swal(
                        'Eliminado!',
                         'El comite ha sido eliminado.',
                         'success'
                            );
                        setTimeout(() => {
                            location.reload();
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
                    <h3 className="card-title">Lista de comites</h3>
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
                    Header: "Nombre",
                    accessor: "nombre",
                    filterable:true
                  },
                  {
                    Header: "Descipción",
                    accessor: "descripcion",
                    filterable:true
                  }
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
                        <button className="form-control btn btn-danger" onClick={()=>this.eliminarC(row.row)}>Eliminar</button>
                    )
                  },
                  {
                    Header: "Editar",
                    accessor: "tipo",
                    maxWidth: 100,
                    Cell: row =>(
                        <button className="form-control btn btn-primary" data-toggle="modal" 
                        data-target="#exampleModal" onClick={()=>this.editarC(row.row)}>Editar</button>
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
                                    <h5 className="modal-title" id="exampleModalLabel">Editar comite</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <RegistrarComite ref={this.RegistrarComite} />
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
  export default ListaComite;