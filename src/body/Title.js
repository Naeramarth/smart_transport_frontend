import React from "react";
import Status from "./Status";

class Title extends React.Component {
    render() {
        let status = this.props.status;
        let color;
        let statusField = <div />;
        if (status !== -1) {
            if (status === 0) {
                color = "titleStatus grey";
            } else if (status === 1) {
                color = "titleStatus green";
            } else if (status === 2){
                color = "titleStatus yellow";
            } else {
                color = "titleStatus red";
            }
            statusField = <Status color={color} />;
        }

        return (
            <div className="title">
                <div className="customer">{this.props.customer}</div>
                <div className="titleWrapper">
                    {statusField}
                    {this.props.name}
                </div>
            </div>
        );
    }
}

export default Title;
