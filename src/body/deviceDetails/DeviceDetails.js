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
                    nostatus={stat.nostatus}
                    novalue={stat.novalue}
                    history={stat.history}
                    timestamp={stat.timestamp}
                    positionData={stat.positionData}
                    id={index}
                />
            ));
        }
        return (
            <div className="deviceDetails">
                {content}
                <div className="buttonWrapper">
                    <div
                        className="deviceButton"
                        onClick={() => this.props.resetDevice()}
                    >
                        <i className="fas fa-sync-alt" />
                    </div>
                    <div
                        className="deviceButton"
                        onClick={() => this.props.editDevice()}
                    >
                        <i className="far fa-edit" />
                    </div>
                    <div
                        className="deviceButton"
                        onClick={() => this.props.deleteDevice()}
                    >
                        <i className="far fa-trash-alt" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceDetails;
