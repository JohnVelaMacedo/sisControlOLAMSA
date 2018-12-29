import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PendienteDescarga from "../Users/Evaluador/PendienteDescarga";
import Home from "../Home";
import Registro from "../agenteGarita/pendienteIngreso/registro";
import Registrar from "../administrador/usuario/registrar";
import Lista from "../administrador/usuario/lista";

class Content extends Component {
    render() {
        return (
            <div className="content-wrapper" style={{'minHeight': '600px'}}>
                <section className="content mt-4">
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/pendiente-descarga" component={PendienteDescarga} />
                        {/* <Route path="/inicio-descarga" component={InicioDescarga} /> */}
                        <Route path="/agenteRegistro" component={Registro} />
                        <Route path="/adminRegUsu" component={Registrar} />
                        <Route path="/listaUsu" component={Lista} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Content;