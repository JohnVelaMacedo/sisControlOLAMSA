import React, {Component} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

class Registro extends React.Component {
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
      }
//      recuperar tipos de personas para el select 
        axios.get('tipoPersona')
        .then(data => {
            this.setState({tipoPersona: [...data.data.tipoPersona]});
        }).catch(error => {
            console.error(error);
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
        if(nombre=="tipoP" && valor=="5"){
            this.setState({
                hidePass:true
            });
        }else{
            this.setState({
                hidePass:false
            });
        }
      this.setState(
          prevState=>({
          persona:{
            ...prevState.persona,
            [nombre]: valor
          }
        })
        );
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
    }
  
    handleSubmit(event) {
      event.preventDefault();

    axios.post('/agregarPersona', {
                persona: this.state.persona,
                password:this.state.claves
            })
            .then(data => {
                if (data.data == 'OK') {
                    // swal({
                    //     position: 'top-end',
                    //     type: 'success',
                    //     title: 'Datos ingresados correctamente',
                    //     showConfirmButton: false,
                    //     timer: 2000
                    // });
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                } else {
                    // swal({
                    //     position: 'top-end',
                    //     type: 'error',
                    //     title: 'No se pudo agregar',
                    //     showConfirmButton: false,
                    //     timer: 2000
                    // });
                }
            }).catch(error => {
                // swal({
                //     position: 'top-end',
                //     type: 'error',
                //     title: 'Sucedió un error, comuníquese con el Administrador',
                //     showConfirmButton: false,
                //     timer: 2000
                // });
                console.log(`Error: ${error}`);
            });
    }

    render() {
      return (
          <section className="content">
              <div className="container-fluid">
                <div className="card card-info">
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombres</label>
                                            <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.persona.nombre} onChange={this.handleChange} placeholder="Nombres"/>
                                            <small className="form-text text-muted">Ingrese nombre de la persona.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="apellidos">Apellidos</label>
                                            <input type="text" className="form-control" id="apellidos" name="apellidos" value={this.state.persona.apellidos} onChange={this.handleChange} placeholder="Apellidos"/>
                                            <small className="form-text text-muted">Ingrese apellido completo de la persona.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="direccion">Dirección</label>
                                            <input type="text" className="form-control" id="direccion" name="direccion" value={this.state.persona.direccion} onChange={this.handleChange} placeholder="Dirección"/>
                                            <small className="form-text text-muted">Ingrese la dirección de la persona.</small>
                                        </div>
                                        <div className="form-group" style={this.state.hidePass?{display:'none'}:{}} >
                                        <label>Contraseña</label>
                                            <input className="form-control" id="password" name="password" type="password" value={this.state.claves.password} onChange={this.handleChangePass} placeholder="Contraseña"/>
                                            <small className="form-text text-muted">Ingrese contraseña para el usuario.</small>
                                        </div>
                                        <div className="form-group" style={this.state.hidePass?{display:'none'}:{}} >
                                        <label>Verifica Contraseña</label>
                                            <input className="form-control" id="repassword" name="repassword" type="password" value={this.state.claves.repassword} onChange={this.handleChangePass} placeholder="Contraseña"/>
                                            <small className="form-text text-muted">Escriba la contraseña nuevamente.</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="dni">Número de Documento</label>
                                            <input type="text" id="dni" name="dni" value={this.state.persona.dni} onChange={this.handleChange} className="form-control" placeholder="Número de documento"/>
                                            <small className="form-text text-muted">Ingrese el dni de la persona.</small>
                                        </div>
                                        <div className="form-group">
                                        <label>Correo electrónico</label>
                                            <input className="form-control" id="email" name="email" type="text" value={this.state.persona.email} onChange={this.handleChange} placeholder="Correo electrónico"/>
                                            <small className="form-text text-muted">Ingrese correo electrónico.</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo Persona</label>
                                            <select className="form-control" id="tipoP" name="tipoP" value={this.state.persona.tipoP} onChange={this.handleChange}>
                                            {this.state.tipoPersona.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.descripcion}</option>;
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

  export default Registro;