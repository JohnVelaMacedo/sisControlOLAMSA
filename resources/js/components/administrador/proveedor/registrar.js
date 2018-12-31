import React, {Component} from 'react';
import Swal from 'sweetalert2';

class RegistrarProveedor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                proveedor:{
                    id:'',
                    nombre:'',
                    descripcion:   '',
                    direccion:'',
                    telefono:''
                }
      }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    limpiar(){
        this.setState({
            proveedor:{
                id:'',
                nombre:'',
                descripcion:   '',
                direccion:'',
                telefono:''
            }
        });
    }

    fillForm(e){
        axios.get(`/getProveedor/${e.id}`)
        .then(data => {
            this.setState({proveedor: data.data.p});
        }).catch(error => {
            console.error(error);
        });
    }
    handleChange(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
        this.setState(
            prev=>({
                proveedor:{
                    ...prev.proveedor,
                    [nombre]:valor
                }
            })
        );
      
    }

    handleSubmit(event) {
    event.preventDefault();
        axios.post('/agregarProveedor', {
                    proveedor: this.state.proveedor
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
                        <h3 className="card-title">Agregar Nuevo Proveedor</h3>
                        <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                        <button type="button" className="btn btn-tool" data-widget="remove"><i className="fa fa-remove"></i></button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row ">
                            <div className="col-md-8 mx-auto">
                                <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-10 mx-auto">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.proveedor.nombre} onChange={this.handleChange} placeholder="Nombre de Provedor" required/>
                                            <small className="form-text text-muted">Ingrese nombre del proveedor.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="descripcion">Descripción</label>
                                            <input type="text" className="form-control" id="descripcion" name="descripcion" value={this.state.proveedor.descripcion} onChange={this.handleChange} placeholder="Descripción de Provedor" required/>
                                            <small className="form-text text-muted">Ingrese descripcion del proveedor.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="direccion">Dirección</label>
                                            <input type="text" className="form-control" id="direccion" name="direccion" value={this.state.proveedor.direccion} onChange={this.handleChange} placeholder="Dirección de Provedor" required/>
                                            <small className="form-text text-muted">Ingrese descripcion del proveedor.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="telefono">Teléfono</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-phone"></i></span>
                                                </div>
                                                <input type="text" className="form-control" data-inputmask={'"mask": "(999) 999-9999"'} data-mask id="telefono" name="telefono" value={this.state.proveedor.telefono} onChange={this.handleChange} placeholder="Descripción de Provedor"   required maxLength="9"/>
                                            </div>
                                            <small className="form-text text-muted">Ingrese descripcion del proveedor.</small>
                                        </div>

                                        <input className="form-control btn btn-primary" type="submit" value="Registrar" disabled={this.state.isSubmitDisabled}/>
                                    </div>
                                </div>
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
  export default RegistrarProveedor;