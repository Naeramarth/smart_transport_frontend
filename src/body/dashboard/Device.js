import React from "react";
import Status from "../Status";

class Device extends React.Component {
    render() {
        let name = this.props.name;
        let status = this.props.status;
        let color;
        if (status === 0) {
            color = "deviceStatus green";
        } else if (status === 1) {
            color = "deviceStatus yellow";
        } else {
            color = "deviceStatus red";
        }
        return (
            <div class="deviceWrapper">
                <Status color={color}/>
                <div class="deviceName">{name}</div>
                <div class="deviceMenu">
                    <i class="fas fa-ellipsis-v" />
                </div>
            </div>
        );
    }
}

export default Device;