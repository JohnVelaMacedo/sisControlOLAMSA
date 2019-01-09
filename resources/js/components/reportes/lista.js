import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { WithContext as ReactTags } from 'react-tag-input';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import $ from "jquery";

//para el tag input: al presionar enter o coma agregue el tag
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
//-------------------

class ListaReporte extends React.Component{

    constructor(props){
        super(props);
        this.state={
            filtro:{
                tipoVehiculo:     '',
                numPlaca:         '',
                transportista:    '',
                comite:           '',
                proveedor:        '',
                desde:            '',
                hasta:          ''
                },
            data: [],
            id:'',
            tipoVehiculo:[],
            comite:[],
            proveedor:[],
            tags: [],
            suggestions: []
        }

        axios.get('/listaInicialReporte')
        .then(data => {
            this.setState({data: [...data.data.reporte]});
        }).catch(error => {
            console.error(error);
        });
        this.getDatos();
        this.handleDrag = this.handleDrag.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.donwload = this.donwload.bind(this);
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
            this.setState({tipoVehiculo: [...data.data.tv]});
        }).catch(error => {
            console.error(error);
        });
    }
//  funciones para el tag input
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
        tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        if(this.state.tags.length<1){
            this.setState(state => ({ 
                tags: [...state.tags, tag]
            }));
            this.setState(
                prevState=>({
                    filtro:{
                    ...prevState.filtro,
                    transportista: tag.id
                    }
                })
                );
            this.setState({
                                isSubmitDisabled:false
                            });
        }
    }
    handleInputChange(e){
        if(e!=''){
            axios.get('/getTransportistas/'+e)
        .then(data => {
            this.setState({suggestions: [...data.data.showT]});
        }).catch(error => {
            console.error(error);
        });
        }
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        this.setState({ tags: newTags });
    }
//  fin de funciones para el tag input

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
        axios.post('/filtroTabla', {
          filtro: this.state.filtro
          })
          .then(data => {
            this.setState({data: [...data.data.reporte]});
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
    
    donwload(){
        
        axios.post('/pdf', {
            filtro: this.state.filtro
            },{responseType: 'arraybuffer'})
            .then(data => {
                var headers = data.data;
                var blob = new Blob([data.data],{type:headers['content-type']});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "reporte.pdf";
                link.click();
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

    render(){
        const { data } = this.state;
        const { tags } = this.state;
        return(
            <div className="col-md-12">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Reporte</h3>
                </div>
                <div className="card-body"></div>
                <div>
                <form onSubmit={this.handleSubmit}>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                            <label>Tipo de Vehículo</label>
                                            <select className="form-control" id="tipoVehiculo" name="tipoVehiculo" value={this.state.filtro.tipoVehiculo} onChange={this.handleChange}>
                                            <option value=''> --- </option>
                                            {this.state.tipoVehiculo.map((e, key) => {
                                                return <option key={key+1} value={e.id}>{e.descripcion}</option>;
                                                })}
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Comité</label>
                                            <select className="form-control" name={'comite'} value={this.state.filtro.comite} onChange={this.handleChange}>
                                            <option value=''>  ---  </option>
                                            {this.state.comite.map((e, key) => {
                                            return <option key={key+1} value={e.id}>{e.nombre}</option>;
                                            })}
                                            </select>
                                        </div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="form-group">
                                                <label>Proveedor </label>
                                                <select className="form-control" id={'proveedor'} name={'proveedor'} value={this.state.filtro.proveedor} onChange={this.handleChange}>
                                                    <option value=''>  ---  </option>
                                                    {this.state.proveedor.map((e, key) => {
                                                    return <option key={key+1} value={e.id}>{e.nombre}</option>;
                                                    })}
                                                    </select>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Número de Placa</label>
                                            <input type="text" id="numPlaca" name="numPlaca" value={this.state.filtro.numPlaca} onChange={this.handleChange} className="form-control" maxLength="9" placeholder="Número de Placa"/>
                                        </div>
                                        </div>

                                        <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Transportista</label>
                                                <ReactTags tags={tags}
                                                    suggestions={this.state.suggestions}
                                                    handleDelete={this.handleDelete}
                                                    handleAddition={this.handleAddition}
                                                    handleDrag={this.handleDrag}
                                                    handleInputChange={this.handleInputChange}
                                                    placeholder="Agregar Transportista"
                                                    inline={true}
                                                    delimiters={delimiters} 
                                                    />
                                        </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Desde <small>(Obligatorio)</small></label>
                                            <input type="date" id="desde" name="desde" value={this.state.filtro.desde} onChange={this.handleChange} className="form-control" required/>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Hasta <small>(Obligatorio)</small></label>
                                            <input type="date" id="hasta" name="hasta" value={this.state.filtro.hasta} onChange={this.handleChange} className="form-control" required/>
                                          </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className="mx-auto col-md-6">
                                <input className="form-control btn btn-primary" type="submit" value="Filtrar" disabled={this.state.isSubmitDisabled}/>
                                </div>
                            </form>
                </div>
                <br/>
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
                            Header: "Pesas",
                            accessor: "pesas",
                            filterable:true,
                            maxWidth:50
                        },
                        {
                            Header: "Vehículo",
                            accessor: "vehiculo",
                            filterable:true,
                            maxWidth:80
                        },
                        {
                            Header: "Placa",
                            accessor: "placa",
                            filterable:true,
                            maxWidth:80
                        },
                        {
                            Header: "Transportista",
                            accessor: "transportista",
                            filterable:true
                        },
                        {
                            Header: "Registro",
                            accessor: "created_at",
                            filterable:true,
                            minWidth:140
                        },
                        {
                            Header: "Entrada",
                            accessor: "entrada",
                            filterable:true,
                            minWidth:140
                        },
                        {
                            Header: "Salida",
                            accessor: "salida",
                            filterable:true,
                            minWidth:140
                        },
                        {
                            Header: "Observaciones",
                            accessor: "observaciones1",
                            filterable:true
                        },
                        {
                            Header: "Inicio Descarga",
                            accessor: "descargaInicio",
                            filterable:true,
                            minWidth:140
                        },
                        {
                            Header: "Inicio Fin",
                            accessor: "descargaFin",
                            filterable:true,
                            minWidth:140
                        },
                        {
                            Header: "Observaciones",
                            accessor: "observaciones2",
                            filterable:true
                        },
                        ]
                    }
                    ]}
                    defaultPageSize={50}
                    style={{fontSize:'12px'}}
                    className="-striped -highlight"
                    classNames={{
                        tags: 'tagsClass',
                        tagInput: 'tagInputClass',
                        tagInputField: 'tagInputFieldClass',
                        selected: 'selectedClass',
                        tag: 'tagClass',
                        remove: 'removeClass',
                        suggestions: 'suggestionsClass',
                        activeSuggestion: 'activeSuggestionClass'
                      }}
                />
                <div>
                    
                </div>
                <br></br>
                
                <a type="button" onClick={this.donwload} target="_blank" className="btn btn-outline-info mx-auto" >Descargar</a>
                <br></br>
                </div>
            </div>
        );
    }
}
export default ListaReporte;