import React, {Component} from 'react';
import Swal from 'sweetalert2';

class RegistrarTipoVehiculo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                tipoVehiculo:{
                    id:'',
                    descripcion:   ''
                }
      }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    limpiar(){
        this.setState({
            tipoVehiculo:{
                id:'',
                descripcion:   ''
            }
        });
    }
    fillForm(e){
        axios.get(`/getTipoVehiculo/${e.id}`)
        .then(data => {
            this.setState({tipoVehiculo: data.data.p});
            // this.setState({claves: data.data.u});
        }).catch(error => {
            console.error(error);
        });
    }
    handleChange(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
        this.setState(
            prev=>({
                tipoVehiculo:{
                    ...prev.tipoVehiculo,
                    [nombre]:valor
                }
            })
        );
      
    }
  
    handleSubmit(event) {
    event.preventDefault();
            axios.post('/agregarTipoVehiculo', {
                        tipoVehiculo: this.state.tipoVehiculo
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
                        <h3 className="card-title">Agregar Nuevo Tipo de Vehículo</h3>
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
                                    <div className="col-md-10 mx-auto">
                                        <div className="form-group">
                                            <label htmlFor="descripcion">Descripción</label>
                                            <input type="text" className="form-control" id="descripcion" name="descripcion" value={this.state.tipoVehiculo.descripcion} onChange={this.handleChange} placeholder="Descripción del Vehículo" required/>
                                            <small className="form-text text-muted">Ingrese descripcion del vehículo.</small>
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
  export default RegistrarTipoVehiculo;