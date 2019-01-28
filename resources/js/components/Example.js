import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { type: null }
    }

    componentDidMount() {
        const app = document.getElementById('app');
        var tipo = app.className;

        this.setState({ type: parseInt(tipo) });
    }

    render() {
        const {type} = this.state;
        return (
            <Router>
                <div>
                    <Sidebar tipo={type} />
                    <Content />      
                </div>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}