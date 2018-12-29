import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2';

class Lista extends React.Component {
    constructor() {
      super();
      this.state = {
        data: []
      };

      axios.get('listaPersona')
        .then(data => {
            console.log(data);
            this.setState({data: [...data.data.Personas]});
        }).catch(error => {
            console.error(error);
        });

    }
    editarP(e){
        console.log(e);
    }
    eliminarP(e){
        // console.log(e);
        Swal({
            title: `Deseas eliminar esta persona: ${e.nombre} ${e.apellidos} ?`,
            text: "No será posible revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, elíminalo!',
            cancelButtonText: 'No, cancelar!',
        }).then((result) => {
            if (result.value) {
                axios.get(`/eliminarPersona/${e.dni}`)
                    .then(data => {
                    if(data.data=="OK"){
                        swal(
                        'Eliminado!',
                         'El sector ha sido eliminado.',
                         'success'
                            );
                        setTimeout(() => {
                            // location.reload();
                            
                            this.getData();
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
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Nombre Completo",
                columns: [
                  {
                    Header: "Nombres",
                    accessor: "nombre",
                    filterable:true
                  },
                  {
                    Header: "Apellidos",
                    filterable:true,
                    id: "apellidos",
                    accessor: d => d.apellidos
                  }
                ]
              },
              {
                Header: "Información",
                columns: [
                  {
                    Header: "DNI",
                    accessor: "dni",
                    filterable:true
                  },
                  {
                    Header: "E-mail",
                    accessor: "email",
                    filterable:true
                  },
                  {
                    Header: "Dirección",
                    accessor: "direccion",
                    filterable:true
                  }
                ]
              },
              {
                Header: 'Persona',
                columns: [
                  {
                    Header: "Tipo",
                    accessor: "tipo",
                    Cell:row=>(
                        row.row.tipo==1?'ADMINISTRADOR':
                        row.row.tipo==2?'SUPERVISOR':
                        row.row.tipo==3?'AGENTE GARITA':
                        row.row.tipo==4?'EVALUADOR RR.HH.':'TRANSPORTISTA'
                    ) 
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
                        <button className="form-control btn btn-danger" onClick={()=>this.eliminarP(row.row)}>Eliminar</button>
                    )
                  },
                  {
                    Header: "Editar",
                    accessor: "tipo",
                    maxWidth: 100,
                    Cell: row =>(
                        <button className="form-control btn btn-primary" onClick={()=>this.editarP(row.row)}>Editar</button>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            
            // getTdProps={(state, rowInfo, column, instance) => {
            //     return {
            //       onClick: (e, handleOriginal) => {
            //         console.log("It was in this row:", rowInfo.original);
            //         if (handleOriginal) {
            //             handleOriginal();
            //           }
            //       }
            //     };
            //   }}

          />
          
        </div>
      );
    }
  }
  export default Lista;