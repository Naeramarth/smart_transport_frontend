import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Error extends React.Component {
    render() {
        return <div class="error">Error</div>;
    }
}
class Loading extends React.Component {
    render() {
        return (
            <div class="loading">
                <i class="fas fa-spinner fa-spin" />
            </div>
        );
    }
}

class Map extends React.Component {
    render() {
        return <div />;
    }
}

class Status extends React.Component {
    render() {
        return <div />;
    }
}

class DeviceDetails extends React.Component {
    render() {
        return <div />;
    }
}

class Device extends React.Component {
    render() {
        let name = this.props.name;
        let status = this.props.status;
        let color;
        if (status == 0) {
            color = "deviceStatus green";
        } else if (status == 1) {
            color = "deviceStatus yellow";
        } else {
            color = "deviceStatus red";
        }
        return (
            <div class="deviceWrapper">
                <div class={color}>
                    <i class="fas fa-circle" />
                </div>
                <div class="deviceName">{name}</div>
                <div class="deviceMenu">
                    <i class="fas fa-ellipsis-v" />
                </div>
            </div>
        );
    }
}

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

class Sidebar extends React.Component {
    render() {
        let shownButtons = this.props.buttons.map(button => (
            <div class="sidebarButtonWrapper" key={button.name}>
                <div class="sidebarButton">
                    <i class={button.symbol} />
                </div>
            </div>
        ));

        return <div class="sidebar">{shownButtons}</div>;
    }
}

class Title extends React.Component {
    render() {
        return <div class="title">{this.props.name}</div>;
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: "Dashboard"
        };
    }

    render() {
        let content;
        if (this.state.shown == "Dashboard") {
            content = <Dashboard />;
        } else if (this.state.shown == "Map") {
            content = <Map />;
        } else if (this.state.shown == "Device") {
            content = <DeviceDetails />;
        } else {
            content = <Error />;
        }

        let buttons = [
            {
                name: "Dashboard",
                symbol: "fas fa-tachometer-alt"
            },
            {
                name: "Map",
                symbol: "fas fa-map-marker-alt"
            }
        ];
        return (
            <div class="main">
                <Sidebar buttons={buttons} />
                <div class="mainContainer">
                    <Title name="Smart Transport" />
                    {content}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
