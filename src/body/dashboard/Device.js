import React from "react";
import Status from "../Status";
import DeviceStat from "../DeviceStat";

class Device extends React.Component {
    render() {
        let name = this.props.name;
        let status = this.props.status;
        let data = this.props.data;
        let id = this.props.id;
        let color;
        if (status === 0) {
            color = "deviceStatus grey";
        } else if (status === 1) {
            color = "deviceStatus green";
        } else if (status === 2){
            color = "deviceStatus yellow";
        } else {
            color = "deviceStatus red";
        }
        let content = data.map((dataEntry, index) => (
            <DeviceStat
                key={index}
                name={dataEntry.name}
                value={dataEntry.value}
                available={dataEntry.available}
                suffix={dataEntry.suffix}
                prefix={dataEntry.prefix}
                status={dataEntry.status}
                positionData={dataEntry.positionData}
                active={dataEntry.active}
            />
        ));
        return (
            <div class="deviceWrapper" onClick={() => this.props.onClick(id)}>
                <div class="deviceHead">
                    <Status color={color} />
                    <div class="deviceName">{name}</div>
                    <div class="deviceMenu">
                        <i class="fas fa-ellipsis-v" />
                    </div>
                </div>
                <div class="deviceBody">{content}</div>
            </div>
        );
    }
}

export default Device;
