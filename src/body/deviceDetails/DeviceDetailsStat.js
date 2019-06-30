import React from "react";
import Status from "../Status";
import DeviceStat from "../DeviceStat";
import MapContainer from "../map/MapContainer";
import DeviceDetailsStatGraph from "./DeviceDetailsStatGraph";

class DeviceDetailsStat extends React.Component {
    render() {
        if (!this.props.active) {
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
            color = "deviceDetailsStatus grey";
        } else if (status === 1) {
            color = "deviceDetailsStatus green";
        } else if (status === 2) {
            color = "deviceDetailsStatus yellow";
        } else {
            color = "deviceDetailsStatus red";
        }
        let content = prefix + value + suffix;
        let device = {
            name: this.props.deviceName,
            data: [
                {
                    value: value,
                    positionData: true,
                    active: true
                }
            ]
        };
        let graph = (
            <DeviceDetailsStatGraph
                suffix={suffix}
                minimum={this.props.minimum}
                maximum={this.props.maximum}
                timestamp={this.props.timestamp}
                value={value}
                history={this.props.history}
            />
        );
        if (this.props.nograph || !this.props.available) {
            graph = "";
        }
        if (this.props.positionData) {
            let zoom = 12;
            content = (
                <div class="deviceDetailsMap">
                    <MapContainer
                        device={device}
                        zoom={zoom}
                        coordinates={value}
                    />
                </div>
            );
        } else if (Array.isArray(value)) {
            let subContent = value.map((valueEntry, index) => (
                <DeviceStat
                    key={index}
                    name={valueEntry.name}
                    value={valueEntry.value}
                    available={valueEntry.available}
                    suffix={valueEntry.suffix}
                    prefix={valueEntry.prefix}
                    status={valueEntry.status}
                    active={valueEntry.active}
                />
            ));
            content = <div class="detailsStatWrapper">{subContent}</div>;
        } else if (!this.props.available) {
            content = "n/a";
        }
        return (
            <div class="deviceDetailsStat">
                <div class="deviceDetailsHead">
                    <Status color={color} />
                    <div class="deviceDetailsname">{name}</div>
                </div>
                <div class="deviceDetailsBody">
                    {content}
                    {graph}
                </div>
            </div>
        );
    }
}

export default DeviceDetailsStat;
