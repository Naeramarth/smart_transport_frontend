import React from "react";
import Status from "./Status";

class Title extends React.Component {
    render() {
        let status = this.props.status;
        let color;
        let statusField = <div />;
        if (status !== -1) {
            if (status === 0) {
                color = "titleStatus green";
            } else if (status === 1) {
                color = "titleStatus yellow";
            } else {
                color = "titleStatus red";
            }
            statusField = <Status color={color} />;
        }

        return (
            <div class="title">
                <div class="titleWrapper">
                    {statusField}
                    {this.props.name}
                </div>
            </div>
        );
    }
}

export default Title;
