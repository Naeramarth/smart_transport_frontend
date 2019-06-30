import React from "react";
import Status from "./Status";

class DeviceStat extends React.Component {
    render() {
        if (this.props.positionData || !this.props.active) {
            return "";
        }
        let name = this.props.name;
        let value = this.props.value;
        let status = this.props.status;
        let suffix = "";
        if (this.props.suffix) {
            suffix = this.props.suffix;
        }
        let prefix = "";
        if (this.props.prefix) {
            prefix = this.props.prefix;
        }
        let color;
        if (status === 0) {
            color = "deviceSubStatus grey";
        } else if (status === 1) {
            color = "deviceSubStatus green";
        } else if (status === 2) {
            color = "deviceSubStatus yellow";
        } else {
            color = "deviceSubStatus red";
        }
        let content = prefix + value + suffix;
        if (Array.isArray(value)) {
            let subContent = value.map((valueEntry, index) => (
                <DeviceStat
                    key={index}
                    name={valueEntry.name}
                    value={valueEntry.value}
                    suffix={valueEntry.suffix}
                    prefix={valueEntry.prefix}
                    status={valueEntry.status}
                    active={valueEntry.active}
                />
            ));
            content = <div class="subStatWrapper">{subContent}</div>;
        } else if (!this.props.available) {
            content = "n/a";
        }
        return (
            <div class="deviceStatWrapper">
                <Status color={color} />
                <div class="stat">
                    {name}:&nbsp;
                    {content}
                </div>
            </div>
        );
    }
}

export default DeviceStat;
