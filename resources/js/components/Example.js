import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { type: null }
    }

    componentDidMount() {
        axios.get('home_user')
            .then(data => {
                this.setState({ type: data.data.user.tipo });
            }).catch(error => console.log(error));
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