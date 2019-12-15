import React from "react";
import "./amenity.scss";

export class Amenity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }


    }
    render () {
        return (
            <div class="amenity">
                <div className="amenity-icon">
                    <img className="icon" src={this.props.icon}></img>
                </div>
                <div className="amenity-label">
                    {this.props.label}
                </div>
            </div>
            );
    }
}

// function Amenity(props) {
//     return (
//     <div>
//         <div className="amenity-icon">
//             {props.icon}
//         </div>
//         <div className="amenity-label">
//             {props.label}
//         </div>
//     </div>
//     );
// }