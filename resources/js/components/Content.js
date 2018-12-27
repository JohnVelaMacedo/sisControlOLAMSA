import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ejemplo from "./Ejemplo/Ejemplo";
import Ejemplo2 from "./Ejemplo/Ejemplo2";
import Home from "./Home";

class Content extends Component {
    render() {
        return (
            <div className="content-wrapper" style={{'minHeight': '600px'}}>
                <section className="content mt-4">
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/ejemplo" component={Ejemplo} />
                        <Route path="/ejemplo2" component={Ejemplo2} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Content;