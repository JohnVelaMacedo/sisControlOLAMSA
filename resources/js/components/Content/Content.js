import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PendienteDescarga from "../Users/Evaluador/PendienteDescarga";
import Home from "../Home";
//para el agente garita
import RegistroPendiente from "../agenteGarita/registroEntrada/registro";
import ListaRegistroEntrada from "../agenteGarita/registroEntrada/lista";

import RegistrarPersona from "../administrador/usuario/registrar";
import ListaPersona from "../administrador/usuario/lista";
import RegistrarTipoVehiculo from "../administrador/tipoVehiculo/registrar";
import ListaTipoVehiculo from "../administrador/tipoVehiculo/lista";
import RegistrarProveedor from "../administrador/proveedor/registrar";
import ListaProveedor from "../administrador/proveedor/lista";
import RegistrarComite from "../administrador/comite/registrar";
import ListaComite from "../administrador/comite/lista";
import ListaPendienteEntrada from "../agenteGarita/pendienteEntrada/lista";

//para los usuarios administradores y supervisores
import RegistroPendienteAS from "../administrador/registroEntrada/registro";
import ListaRegistroEntradaAS from "../administrador/registroEntrada/lista";

import ListaReporte from "../reportes/lista";

class Content extends Component {
    render() {
        return (
            <div className="content-wrapper" style={{'minHeight': '200px !important'}}>
                <section className="content pt-4">
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/pendiente-descarga" component={PendienteDescarga} />

                        <Route path="/agenteRegistro" component={RegistroPendiente} />
                        <Route path="/listaAgenteReg" component={ListaRegistroEntrada} />
                        <Route path="/listaPendienteEntrada" component={ListaPendienteEntrada} />

                        <Route path="/adminRegUsu" component={RegistrarPersona} />
                        <Route path="/listaUsu" component={ListaPersona} />
                        <Route path="/adminRegTipoVehiculo" component={RegistrarTipoVehiculo} />
                        <Route path="/listaTipoV" component={ListaTipoVehiculo} />
                        <Route path="/adminRegProv" component={RegistrarProveedor} />
                        <Route path="/listaProv" component={ListaProveedor} />
                        <Route path="/adminRegComite" component={RegistrarComite} />
                        <Route path="/listaCom" component={ListaComite} />

                        <Route path="/listaReporte" component={ListaReporte} />

                        <Route path="/agenteRegistro-as" component={RegistroPendienteAS} />
                        <Route path="/listaAgenteReg-as" component={ListaRegistroEntradaAS} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Content;