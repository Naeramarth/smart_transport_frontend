import React from "react";
import Device from "./Device";
import Loading from "../Loading";
import NewDevice from "./NewDevice";

class Dashboard extends React.Component {
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
            content = this.props.devices.map((device, index) => (
                <Device
                    key={index}
                    name={device.name}
                    status={device.status}
                    data={device.data}
                    id={index}
                    onClick={this.props.onClick}
                />
            ));
        }

        return (
            <div className="dashboard">
                {content}
                <NewDevice onclick={() => this.props.newDevice()} />
            </div>
        );
    }
}

export default Dashboard;
