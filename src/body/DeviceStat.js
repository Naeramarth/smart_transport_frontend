import React from "react";
import Status from "./Status";

class DeviceStat extends React.Component {
    render() {
        let name = this.props.name;
        let value = this.props.value;
        let status = this.props.status;
        let color;
        if (status === 0) {
            color = "deviceSubStatus green";
        } else if (status === 1) {
            color = "deviceSubStatus yellow";
        } else {
            color = "deviceSubStatus red";
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
            content = (<div class="subStatWrapper">{subContent}</div>);
        }
        return (
            <div class="deviceStatWrapper">
                <Status color={color} />
                <div class="stat">
                    {name}
                    {content}
                </div>
            </div>
        );
    }
}

export default DeviceStat;
