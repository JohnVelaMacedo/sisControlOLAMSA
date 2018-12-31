import React, {Component} from 'react';
import Swal from 'sweetalert2';

class RegistrarPersona extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                persona:{
                    id:'',
                    nombre: '',
                    apellidos:  '',
                    dni:    '',
                    email:  '',
                    direccion:  '',
                    tipoP:   ''
                },
                claves:{
                    password:   '',
                    repassword: ''
                },
                tipoPersona:[
                ],
                hidePass:false,
                isSubmitDisabled:true,
                msjPass:''
      }
      
//      recuperar tipos de personas para el select 
        this.getDatosSelect();

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    limpiar(){
        this.setState({
            persona:{
                id:'',
                nombre: '',
                apellidos:  '',
                dni:    '',
                email:  '',
                direccion:  '',
                tipoP:   ''
            },
            claves:{
                password:   '',
                repassword: ''
            },
            isSubmitDisabled:true,
                msjPass:''
        });
    }

    getDatosSelect(){
        axios.get('tipoPersona')
        .then(data => {
            this.setState({tipoPersona: [...data.data.tipoPersona]});
        }).catch(error => {
            console.error(error);
        });
    }

    fillForm(e){
        console.log(e);
        axios.get(`/getPersona/${e.dni}`)
        .then(data => {
            this.setState({persona: data.data.p});
            // this.setState({claves: data.data.u});
        }).catch(error => {
            console.error(error);
        });
    }
    handleChange(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
        if(nombre=="tipoP"){
            if(valor=="5"){
                this.setState({
                    hidePass:true,
                    isSubmitDisabled:false,
                    claves:{
                        password:'',
                        repassword:''
                    },
                    msjPass:''
                });
            }
            if(valor=="1" || valor=="2" || valor=="3" || valor=="4" ){
                if(this.state.isSubmitDisabled || this.state.hidePass){
                    this.setState({
                        hidePass:false,
                        isSubmitDisabled:true
                    });
                }
            }
            if(valor==""){
                this.setState({
                    isSubmitDisabled:true,
                    claves:{
                        password:'',
                        repassword:''
                    },
                    msjPass:''
                });
            }
        }
        if(nombre=="dni"){
            if(!isNaN(valor)){
                this.setState(
                    prevState=>({
                    persona:{
                      ...prevState.persona,
                      [nombre]: valor
                    }
                  })
                  ); 
            }
        }else{
            this.setState(
                prevState=>({
                persona:{
                  ...prevState.persona,
                  [nombre]: valor
                }
              })
              );
        }
      
    }
    handleChangePass(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
      this.setState(
          prevState=>({
          claves:{
            ...prevState.claves,
            [nombre]: valor
          }
        })
        );
        if(valor==this.state.claves.repassword || this.state.claves.password==valor){
            if(valor!=''){
                this.setState({
                    isSubmitDisabled:false,
                    msjPass:'Contraseñas correctas!'
                   }); 
            }else{
                this.setState({
                    isSubmitDisabled:true,
                    msjPass:''
                   }); 
            }
         }else{
             this.setState({
                 isSubmitDisabled:true,
                 msjPass:'Contraseñas no coinciden!'
                }); 
         }
    }
  
    handleSubmit(event) {
      event.preventDefault();
        axios.post('/agregarPersona', {
                    persona: this.state.persona,
                    password:this.state.claves
                })
                .then(data => {
                    console.log(data);
                    if (data.data == 'OK') {
                        Swal({
                            position: 'top-end',
                            type: 'success',
                            title: 'Datos ingresados correctamente',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        setTimeout(() => {
                            // location.reload();
                            this.limpiar();
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
    }

    render() {
      return (
          <section className="content">
              <div className="container-fluid">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Agregar Nueva Persona</h3>
                        <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                        <button type="button" className="btn btn-tool" data-widget="remove"><i className="fa fa-remove"></i></button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row ">
                            <div className="col-md-12">
                                <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombres</label>
                                            <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.persona.nombre} onChange={this.handleChange} placeholder="Nombres" required/>
                                            <small className="form-text text-muted">Ingrese nombre de la persona.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="apellidos">Apellidos</label>
                                            <input type="text" className="form-control" id="apellidos" name="apellidos" value={this.state.persona.apellidos} onChange={this.handleChange} placeholder="Apellidos" required/>
                                            <small className="form-text text-muted">Ingrese apellido completo de la persona.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="direccion">Dirección</label>
                                            <input type="text" className="form-control" id="direccion" name="direccion" value={this.state.persona.direccion} onChange={this.handleChange} placeholder="Dirección" required/>
                                            <small className="form-text text-muted">Ingrese la dirección de la persona.</small>
                                        </div>
                                        <div className="form-group" style={this.state.hidePass?{display:'none'}:{}} >
                                        <label>Contraseña</label> <small style={this.state.isSubmitDisabled?{color:'red'}:{color:'green'}}><strong>{this.state.msjPass}</strong></small> 
                                            <input className="form-control" id="password" name="password" type="password" value={this.state.claves.password} onChange={this.handleChangePass} placeholder="Contraseña" required={this.state.hidePass?false:true} />
                                            <small className="form-text text-muted">Ingrese contraseña para el usuario.</small>
                                        </div>
                                        <div className="form-group" style={this.state.hidePass?{display:'none'}:{}} >
                                        <label>Verifica Contraseña</label>
                                            <input className="form-control" id="repassword" name="repassword" type="password" value={this.state.claves.repassword} onChange={this.handleChangePass} placeholder="Contraseña" required={this.state.hidePass?false:true}/>
                                            <small className="form-text text-muted">Escriba la contraseña nuevamente.</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="dni">Número de Documento</label>
                                            <input type="text" id="dni" name="dni" value={this.state.persona.dni} onChange={this.handleChange} className="form-control" placeholder="Número de documento" required maxLength="8"/>
                                            <small className="form-text text-muted">Ingrese el dni de la persona.</small>
                                        </div>
                                        <div className="form-group">
                                        <label>Correo electrónico</label>
                                            <input className="form-control" id="email" name="email" type="email" value={this.state.persona.email} onChange={this.handleChange} placeholder="Correo electrónico"/>
                                            <small className="form-text text-muted">Ingrese correo electrónico.</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo Persona</label>
                                            <select className="form-control" id="tipoP" name="tipoP" value={this.state.persona.tipoP} onChange={this.handleChange} required>
                                            <option value=''> ------ </option>
                                            {this.state.tipoPersona.map((e, key) => {
                                            return <option key={key+1} value={e.id}>{e.descripcion}</option>;
                                            })}
                                            </select>
                                            <small className="form-text text-muted">Seleccione el tipo de persona que desea registrar.</small>
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
  export default RegistrarPersona;
