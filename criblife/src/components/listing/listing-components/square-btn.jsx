import React from "react";
import "./square-btn.scss";

export class SquareButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }


    }
    render () {
        return (
            <div class="btn">
                <div className="btn-label">
                    {this.props.label}
                </div>
            </div>
            );
    }
}
