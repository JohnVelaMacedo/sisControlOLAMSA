import React, {Component} from 'react';
import Swal from 'sweetalert2';
import { WithContext as ReactTags } from 'react-tag-input';
import './tagsInputStyles.css'

//para el tag input: al presionar enter o coma agregue el tag
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
//-------------------

class RegistroPendienteAS extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          registro:{
                    id:               '',
                    tipoVehiculo:     '',
                    numPlaca:         '',
                    transportista:    '',
                    observaciones:    '',
                    },
            rows:[{
                id:'',
                numPesas: "1",
                comite: "",
                proveedor: ""
            }],
            tipoVehiculo:[],
            comite:[],
            proveedor:[],
            isSubmitDisabled: true,
            tags: [
            ],
            suggestions: []
        };

        this.getDatos();

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.addRow = this.addRow.bind(this);
        this.delRow = this.delRow.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
  
    fillForm(e){
        axios.get(`/getRegEntrada/${e.id}`)
        .then(data => {
            console.log(data.data.t);
            this.setState({
                registro: data.data.p,
                tags:data.data.t,
                rows:data.data.r,
                isSubmitDisabled: false
            });
        }).catch(error => {
            console.error(error);
        });
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
        this.setState({
            isSubmitDisabled:true
        });
    }
 
    handleAddition(tag) {
        if(this.state.tags.length<1){
            this.setState(state => ({ 
                tags: [...state.tags, tag]
             }));
             this.setState(
                prevState=>({
                    registro:{
                      ...prevState.registro,
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

    handleBlur(e) {
        // const valor = e.target.value;
        // const nombre=e.target.name;
        // // const rule = /^(([A-Z]{3,3})\-([0-9]{3,4}))$/;
        // // const valid = rule.test(valor);
        // // console.log(nombre);
        //     if(nombre=="tipoVehiculo" || nombre=="proveedor" || nombre=="comite"){
        //         if(this.state.registro.tipoVehiculo=='' || this.state.registro.proveedor=='' || this.state.registro.comite=='' || this.state.tags.length==0){
        //             this.setState({
        //                 isSubmitDisabled:true
        //             });
        //         }else{
        //             this.setState({
        //                 isSubmitDisabled:false
        //             });
        //         }
        //     }
        
    }

    delRow(e){
        const arr=this.state.rows;
        arr.splice(e.target.name,1);
        this.setState({
            rows:arr
        });
    }
    addRow(e){
        let pesa;
        if(this.state.rows.length>0){
            pesa=parseInt(this.state.rows[this.state.rows.length-1].numPesas)+1;
        }else{
            pesa=1;
        }
        this.setState((pre)=>({
            rows:[...pre.rows,{
                                id:"",
                                numPesas: pesa,
                                comite: "",
                                proveedor: ""
            }]
        }));
    }

    handleChange(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
        const id=event.target.dataset.id;
        if (["numPesas", "comite","proveedor"].includes(nombre) ) {
            let rows = [...this.state.rows]   
            rows[id][nombre] = valor
            this.setState({ rows })
          }else{
            this.setState(
                prevState=>({
                    registro:{
                      ...prevState.registro,
                      [nombre]: valor
                    }
                  })
                );
          }
        
    }
  
    limpiar(){
        this.setState({
            registro:{
                id:               '',
                tipoVehiculo:     '',
                numPlaca:         '',
                transportista:    '',
                numPesas:         '',
                comite:           '',
                proveedor:        '',
                observaciones:    '',
                },
            tags:[],
            isSubmitDisabled:true,
            rows:[{
                id:'',
                numPesas: "0",
                comite: "",
                proveedor: ""
            }]
        });
    }
    handleSubmit(event) {
      event.preventDefault();
      axios.post('/agregarRegistroEntrada', {
        registro: this.state.registro,
        pesas:this.state.rows
        },{responseType: 'arraybuffer'})
        .then(data => {
            // console.log(data);
            if (data.data == 'OK') {
                Swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Datos ingresados correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(() => {
                    location.reload();
                    // this.limpiar();
                }, 1500);
            } else {
                var headers = data.data;
                var blob = new Blob([data.data],{type:headers['content-type']});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = this.state.registro.numPlaca+"-ticket.pdf";
                link.click();
                location.reload();
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

    }

    
  
    render() {
        const { tags } = this.state;
        let {rows}=this.state;
      return (
          <section className="content">
              <div className="container-fluid">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Registro</h3>
                        <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                        <button type="button" className="btn btn-tool" data-widget="remove"><i className="fa fa-remove"></i></button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row ">
                            <div className="col-md-12">
                                <form onSubmit={this.handleSubmit}>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                            <label>Tipo de Vehículo</label>
                                            <select className="form-control" id="tipoVehiculo" name="tipoVehiculo" value={this.state.registro.tipoVehiculo} onChange={this.handleChange} required>
                                            <option value=''> --- </option>
                                            {this.state.tipoVehiculo.map((e, key) => {
                                                return <option key={key+1} value={e.id}>{e.descripcion}</option>;
                                                })}
                                            </select>
                                            {/* <small className="form-text text-muted">Seleccione un tipo de vehículo.</small> */}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Número de Placa</label>
                                            <input type="text" id="numPlaca" name="numPlaca" value={this.state.registro.numPlaca} onChange={this.handleChange} className="form-control" id="numPesas" maxLength="9" placeholder="Número de Placa" required/>
                                            {/* <small className="form-text text-muted">Ingrese la place del vehículo.</small> */}
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
                                                {/* <small className="form-text text-muted">Ingrese el nombre del Transportista y selecceione en las sugerencias.</small> */}
                                        </div>
                                        </div>

                                    </div>
                                    
                                    <hr></hr>
                                    <h3 className="d-inline">Pesas del Vehículo </h3>
                                    <button type="button" className="d-inline btn btn-success" onClick={this.addRow}>Agregar <i className="fa fa-plus-square" aria-hidden="true"></i></button>
                                    {rows.map((row,index)=>{
                                        let numPesas=`numPesas${index}`,comite=`comite${index}`,proveedor=`proveedor${index}`
                                        return(
                                            <div className="row" key={index}>
                                                <div className="col-md-2">
                                                <div className="form-group">
                                                    <label htmlFor={numPesas}>Pesas</label>
                                                    <input type="number" className="form-control" id={'numPesas'} data-id={index} name={'numPesas'} value={this.state.rows[index].numPesas} onChange={this.handleChange} min="0"  placeholder="Número de Pesas" required/>
                                                    {/* <small className="form-text text-muted">Ingrese el número de pesas.</small> */}
                                                </div>
                                                </div>
                                                <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Comité</label>
                                                    <select className="form-control" id={'comite'} data-id={index} name={'comite'} value={this.state.rows[index].comite} onChange={this.handleChange} required >
                                                    <option value=''>  ---  </option>
                                                    {this.state.comite.map((e, key) => {
                                                    return <option key={key+1} value={e.id}>{e.nombre}</option>;
                                                    })}
                                                    </select>
                                                    {/* <small className="form-text text-muted">Seleccione Comité.</small> */}
                                                </div>
                                                </div>
                                                <div className="col-md-4">
                                                <div className="form-group">
                                                <label>Proveedor </label>
                                                <select className="form-control" id={'proveedor'} data-id={index} name={'proveedor'} value={this.state.rows[index].proveedor} onChange={this.handleChange} required>
                                                    <option value=''>  ---  </option>
                                                    {this.state.proveedor.map((e, key) => {
                                                    return <option key={key+1} value={e.id}>{e.nombre}</option>;
                                                    })}
                                                    </select>
                                                    {/* <small className="form-text text-muted">Seleccione un proveedor.</small> */}
                                                </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="form-group">
                                                    <label>Eliminar</label>
                                                    <button type="button" name={index} onClick={this.delRow} className="form-control btn btn-danger"><i className="fa fa-minus-square" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}

                                    <div className="row">
                                        <div className="col-md-12">
                                        <div className="form-group">
                                        <label>Observaciones</label>
                                            <input className="form-control" id="observaciones" name="observaciones" type="text" value={this.state.registro.observaciones} onChange={this.handleChange} />
                                            {/* <small id="emailHelp" className="form-text text-muted">Registre alguna observación.</small> */}
                                        </div>
                                        </div>
                                    </div>

                                </div>
                                    <input className="form-control btn btn-primary" type="submit" value="Registrar" disabled={this.state.isSubmitDisabled}/>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </section>
      );
    }
  }

  export default RegistroPendienteAS;
