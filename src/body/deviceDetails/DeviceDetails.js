import React from "react";
import Loading from "../Loading";
import DeviceDetailsStat from "./DeviceDetailsStat";

class DeviceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Loading />;
        } else {
            content = this.props.device.data.map((stat, index) => (
                <DeviceDetailsStat
                    key={index}
                    deviceName={this.props.device.name}
                    name={stat.name}
                    status={stat.status}
                    value={stat.value}
                    available={stat.available}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    active={stat.active}
                    minimum={stat.minimum}
                    maximum={stat.maximum}
                    nograph={stat.nograph}
                    history={stat.history}
                    timestamp={stat.timestamp}
                    positionData={stat.positionData}
                    id={index}
                />
            ));
        }
        return (
            <div class="deviceDetails">
                {content}
                <div class="editButton" onClick={() => this.props.editDevice()}>
                    <i class="far fa-edit" />
                </div>
            </div>
        );
    }
}

export default DeviceDetails;
