import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';
import RegistroPendiente from './registro'

class ListaRegistroEntradaAS extends React.Component {
    constructor() {
      super();
      this.RegistroPendiente = React.createRef();
      this.state = {
        data: [],
        id:'',
        filtro:{
          desde:          '',
          hasta:          ''
          },
      };

      this.getDataTable();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

    verInfo(e){
      axios.get(`/verInfo/${e.id}`)
        .then(data => {
          let string=`<ul class="list-unstyled">`;
          data.data.pesas.map((val)=>{
                          string+=`<li><div class="callout callout-info"><p>Pesas: ${val.numPesas}</p><p>Comite: ${val.comite}</p><p>Proveedor: ${val.proveedor}</p></div></li>`
                      });
          string+=`</ul>`;
          Swal({
            title: '<h3><strong>Pesas Detalle</strong></h3>',
            html:string,
            showCloseButton: true,
            focusConfirm: false,
          })
        }).catch(error => {
            console.error(error);
        });
    }

    handleChange(event) {
      const nombre=   event.target.name;
      const valor =   event.target.value;
      this.setState(
          prevState=>({
              filtro:{
              ...prevState.filtro,
              [nombre]: valor
              }
          })
          );
  }

  handleSubmit(event) {
    event.preventDefault();
  //   console.log(this.state.rows);
    axios.post('/filtroTablaReg', {
      filtro: this.state.filtro
      })
      .then(data => {
        this.setState({data: [...data.data.regEn]});
      }).catch(error => {
          Swal({
              position: 'top-end',
              type: 'error',
              title: 'Sucedió un error, comuníquese con el Administrador!',
              showConfirmButton: false,
              timer: 2000
          });
          console.log(`Error: ${error}`);
      });
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
                    if(data.statusText=="OK"){
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
                <form onSubmit={this.handleSubmit}>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Desde <small>(Obligatorio)</small></label>
                                            <input type="date" id="desde" name="desde" value={this.state.filtro.desde} onChange={this.handleChange} className="form-control" required/>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Hasta <small>(Obligatorio)</small></label>
                                            <input type="date" id="hasta" name="hasta" value={this.state.filtro.hasta} onChange={this.handleChange} className="form-control" required/>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <input className="form-control btn btn-primary" type="submit" value="Filtrar" disabled={this.state.isSubmitDisabled}/>
                                </div>
                            </form>
                            <br></br>
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
                    Header: "Pesas",
                    accessor: "tipo",
                    maxWidth: 100,
                    Cell: row =>(
                        <button className="form-control btn btn-info" onClick={()=>this.verInfo(row.row)}><i className="fa fa-eye" aria-hidden="true"></i></button>
                    )
                  },
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
            defaultPageSize={50}
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
  export default ListaRegistroEntradaAS;