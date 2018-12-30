import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PendienteDescarga from "../Users/Evaluador/PendienteDescarga";
import Home from "../Home";
import RegistroPendiente from "../agenteGarita/pendienteIngreso/registro";
import RegistrarPersona from "../administrador/usuario/registrar";
import ListaPersona from "../administrador/usuario/lista";
import RegistrarTipoVehiculo from "../administrador/tipoVehiculo/registrar";
import ListaTipoVehiculo from "../administrador/tipoVehiculo/lista";
import RegistrarProveedor from "../administrador/proveedor/registrar";
import ListaProveedor from "../administrador/proveedor/lista";

class Content extends Component {
    render() {
        return (
            <div className="content-wrapper" style={{'minHeight': '600px'}}>
                <section className="content mt-4">
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/pendiente-descarga" component={PendienteDescarga} />
                        {/* <Route path="/inicio-descarga" component={InicioDescarga} /> */}
                        <Route path="/agenteRegistro" component={RegistroPendiente} />
                        <Route path="/adminRegUsu" component={RegistrarPersona} />
                        <Route path="/listaUsu" component={ListaPersona} />
                        <Route path="/adminRegTipoVehiculo" component={RegistrarTipoVehiculo} />
                        <Route path="/listaTipoV" component={ListaTipoVehiculo} />
                        <Route path="/adminRegProv" component={RegistrarProveedor} />
                        <Route path="/listaProv" component={ListaProveedor} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Content;