import React from "react";
import Device from "./Device";
import Loading from "../Loading";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.devices = [];
    }

    componentDidMount() {
        //TODO get Data from backend
        for (let i = 1; i <= 20; i++) {
            this.devices.push({
                name: "Gerät " + i,
                status: Math.floor(Math.random() * 3)
            });
        }
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 1000);
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Loading />;
        } else {
            content = this.devices.map(device => (
                <Device name={device.name} status={device.status} />
            ));
        }

        return <div class="dashboard">{content}</div>;
    }
}

export default Dashboard;