import "./create-step.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

export class CreateStepA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div>
            <div>
                <h3 className="text-center">1. Your Place</h3>
                <div className="input-container mx-autp">
                    <h4 > Name of Posting</h4>
                    <input></input>
                    <h4>Your Address</h4>
                    <input></input>
                    <h4>Associated Post Secondary Schools</h4>
                    <input></input>
                </div>
            </div>
        </div>);
    }
}
