import React from "react";
import Status from "../Status";
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
        let shownStatus = <Status color={color} />;
        if (this.props.nograph || !this.props.available) {
            graph = "";
        }
        if(this.props.nostatus){
            shownStatus = "";
        }
        if (this.props.novalue) {
            content = "";
        } else if (this.props.positionData) {
            let zoom = 12;
            content = (
                <div className="deviceDetailsMap">
                    <MapContainer
                        device={device}
                        zoom={zoom}
                        coordinates={value}
                    />
                </div>
            );
        } else if (!this.props.available) {
            content = "n/a";
        }
        return (
            <div className="deviceDetailsStat">
                <div className="deviceDetailsHead">
                    {shownStatus}
                    <div className="deviceDetailsname">{name}</div>
                </div>
                <div className="deviceDetailsBody">
                    {content}
                    {graph}
                </div>
            </div>
        );
    }
}

export default DeviceDetailsStat;
