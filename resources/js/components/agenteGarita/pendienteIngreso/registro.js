import React, {Component} from 'react';

import { WithContext as ReactTags } from 'react-tag-input';
import './tagsInputStyles.css'

//para el tag input: al presionar enter o coma agregue el tag
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
//-------------------

class Registro extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          tipoVehiculo:     '',
          numPlaca:         '',
          transportista:    '',
          numPesas:         '',
          comite:           '',
          proveedor:        '',
          observaciones:    '',
          isSubmitDisabled: false,
        tags: [
            // { id: "Thailand", text: "Thailand" },
            // { id: "India", text: "India" }
         ],
        suggestions: [
            { id: 'USA', text: 'USA' },
            { id: 'Germany', text: 'Germany' },
            { id: 'Austria', text: 'Austria' },
            { id: 'Costa Rica', text: 'Costa Rica' },
            { id: 'Sri Lanka', text: 'Sri Lanka' },
            { id: 'Thailand', text: 'Thailand' }
         ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ 
            tags: [...state.tags, tag]
         }));
         this.setState({
            transportista: tag.id
         });
    }

    handleInputChange(e) {

    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }


    handleChange(event) {
        const nombre=   event.target.name;
        const valor =   event.target.value;
      this.setState({
          [nombre]: valor
        });
    }
  
    handleSubmit(event) {
    //   alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
      console.log(this.state);
    }

    
  
    render() {
        const { tags, suggestions } = this.state;
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
                                        <label>Tipo de Vehículo</label>
                                        <select className="form-control" id="tipoVehiculo" name="tipoVehiculo"  value={this.state.tipoVehiculo} onChange={this.handleChange}>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                        <option value="4">option 4</option>
                                        <option value="5">option 5</option>
                                        </select>
                                        <small className="form-text text-muted">Seleccione un tipo de vehículo.</small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="numPesas">Número de Pesas</label>
                                            <input type="number" className="form-control" id="numPesas" name="numPesas" value={this.state.numPesas} onChange={this.handleChange} placeholder="Número de Pesas"/>
                                            <small className="form-text text-muted">Ingrese el número de pesas.</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Transportista</label>
                                                <ReactTags tags={tags}
                                                    suggestions={suggestions}
                                                    handleDelete={this.handleDelete}
                                                    handleAddition={this.handleAddition}
                                                    handleDrag={this.handleDrag}
                                                    handleInputChange={this.handleInputChange}
                                                    placeholder="Agregar Transportista"
                                                    inline={true}
                                                    delimiters={delimiters} />
                                                <small className="form-text text-muted">Ingrese el nombre del Transportista y selecceione en las sugerencias.</small>
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                    
                                        <div className="form-group">
                                            <label htmlFor="numPesas">Número de Placa</label>
                                            <input type="text" id="numPlaca" name="numPlaca" value={this.state.numPlaca} onChange={this.handleChange} className="form-control" id="numPesas" placeholder="Número de Placa"/>
                                            <small className="form-text text-muted">Ingrese la place del vehículo.</small>
                                        </div>
                                    
                                        <div className="form-group">
                                            <label>Comité</label>
                                            <select className="form-control" id="comite" name="comite" value={this.state.comite} onChange={this.handleChange}>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                            <option value="3">option 3</option>
                                            <option value="4">option 4</option>
                                            <option value="5">option 5</option>
                                            </select>
                                            <small className="form-text text-muted">Seleccione Comité.</small>
                                        </div>
                                    
                                        <div className="form-group">
                                        <label>Proveedor </label>
                                            <input className="form-control" id="proveedor" name="proveedor" type="text" value={this.state.proveedor} onChange={this.handleChange} />
                                            <small className="form-text text-muted">Ingrese proveedor.</small>
                                        </div>

                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                        <label>Observaciones</label>
                                            <input className="form-control" id="observaciones" name="observaciones" type="text" value={this.state.observaciones} onChange={this.handleChange} />
                                            <small id="emailHelp" className="form-text text-muted">Registre alguna observación.</small>
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