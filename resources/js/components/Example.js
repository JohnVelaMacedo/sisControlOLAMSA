import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        axios.post('logout')
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Ke fue?</div>

                            <div className="card-body">
                                Qué fue?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}