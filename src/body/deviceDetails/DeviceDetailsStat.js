import React from "react";
import Status from "../Status";
import DeviceStat from "../DeviceStat";

class DeviceDetailsStat extends React.Component {
    render() {
        let name = this.props.name;
        let value = this.props.value;
        let status = this.props.status;
        let color;
        if (status === 0) {
            color = "deviceDetailsStatus green";
        } else if (status === 1) {
            color = "deviceDetailsStatus yellow";
        } else {
            color = "deviceDetailsStatus red";
        }
        let content = value;
        if (Array.isArray(value)) {
            let subContent = value.map((valueEntry, index) => (
                <DeviceStat
                    key={index}
                    name={valueEntry.name}
                    value={valueEntry.value}
                    status={valueEntry.status}
                />
            ));
            content = (<div class="detailsStatWrapper">{subContent}</div>);
        }
        return (
            <div class="deviceDetailsStat">
                <div class="deviceDetailsHead">
                    <Status color={color} />
                    <div class="deviceDetailsname">{name}</div>
                </div>
                <div class="deviceDetailsBody">{content}</div>
            </div>
        );
    }
}

export default DeviceDetailsStat;
