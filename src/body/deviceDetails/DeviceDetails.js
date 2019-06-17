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
                    name={stat.name}
                    status={stat.status}
                    value={stat.value}
                    id={index}
                />
            ));
        }
        return <div class="deviceDetails">{content}</div>;
    }
}

export default DeviceDetails;
