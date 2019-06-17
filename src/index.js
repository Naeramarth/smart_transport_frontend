import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Sidebar from "./sidebar/Sidebar";
import Title from "./body/Title";
import Dashboard from "./body/dashboard/Dashboard";
import DeviceDetails from "./body/deviceDetails/DeviceDetails";
import MapContainer from "./body/map/MapContainer";
import Error from "./Error";
import Loading from "./body/Loading";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTitle = "Smart Transport";
        this.interval = false;
        this.state = {
            shown: "Loading",
            devices: [],
            selected: -1,
            title: this.defaultTitle
        };
    }

    openDetails(device) {
        this.setState({
            shown: "Device",
            selected: device,
            title: this.state.devices[device].name
        });
    }

    openDashboard() {
        this.setState({
            shown: "Dashboard",
            selected: -1,
            title: this.defaultTitle
        });
    }

    openMap() {
        this.setState({
            shown: "Map",
            selected: -1,
            title: this.defaultTitle
        });
    }

    createValues() {
        //TODO get Data from backend
        let newDevices = [];
        for (let i = 1; i <= 20; i++) {
            //mockedData START
            let conValue =
                Math.random() < 0.1 ? false : Math.floor(Math.random() * 500);
            let conStatus = conValue < 400 ? 0 : conValue ? 1 : 2;
            let tremValue = Math.floor(Math.random() * 5);
            let tremStatus = tremValue < 4 ? 0 : tremValue < 5 ? 1 : 2;
            let humStatus = Math.random() < 0.1 ? 2 : Math.random() < 0.2 ? 1 : 0;
            let tempValue = Math.floor(Math.random() * 45 - 10);
            let tempStatus =
                0 < tempValue && tempValue < 25
                    ? 0
                    : -5 < tempValue && tempValue < 30
                    ? 1
                    : 2;
            let cpuValue = Math.floor(Math.random() * 100);
            let cpuStatus = cpuValue < 75 ? 0 : cpuValue < 90 ? 1 : 2;
            let ramValue = Math.floor(Math.random() * 100);
            let ramStatus = ramValue < 75 ? 0 : ramValue < 90 ? 1 : 2;
            let aSValue = Math.floor(Math.random() * 5 + 1);
            let aSStatus = aSValue < 2 ? 2 : aSValue < 3 ? 1 : 0;
            let sysStatus = Math.max(cpuStatus, ramStatus, aSStatus);
            let mainStatus = Math.max(
                conStatus,
                tremStatus,
                humStatus,
                tempStatus,
                sysStatus
            );
            //mockedData END

            newDevices.push({
                name: "Gerät " + i,
                status: mainStatus,
                data: [
                    {
                        name: "Verbindung",
                        value: conValue ? conValue + "ms" : "Nicht Verfügbar",
                        status: conStatus
                    },
                    {
                        name: "Erschütterungen",
                        value: tremValue,
                        status: tremStatus
                    },
                    {
                        name: "Feuchtigkeit",
                        value: "??",
                        status: humStatus
                    },
                    {
                        name: "Temp",
                        value: tempValue + "°c",
                        status: tempStatus
                    },
                    {
                        name: "System",
                        value: [
                            {
                                name: "CPU",
                                value: cpuValue + "%",
                                status: cpuStatus
                            },
                            {
                                name: "RAM",
                                value: ramValue + "%",
                                status: ramStatus
                            },
                            {
                                name: "Aktive Sensoren",
                                value: aSValue,
                                status: aSStatus
                            }
                        ],
                        status: sysStatus
                    }
                ]
            });
        }
        this.setState({
            devices: newDevices
        });
    }

    componentDidMount() {
        this.createValues();
        setTimeout(() => {
            this.setState({
                shown: "Dashboard"
            });
        }, 1000);
        if(this.interval){
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.createValues();
        }, 1000);
    }

    render() {
        let content;
        let selected = this.state.selected;
        let devices = this.state.devices;
        let shown = this.state.shown;
        if (shown === "Loading") {
            content = <Loading />;
        } else if (shown === "Dashboard") {
            content = (
                <Dashboard
                    devices={devices}
                    onClick={device => this.openDetails(device)}
                />
            );
        } else if (shown === "Map") {
            content = <MapContainer />;
        } else if (shown === "Device") {
            content = (
                <DeviceDetails
                    device={devices[selected]}
                />
            );
        } else {
            content = <Error />;
        }

        let buttons = [
            {
                name: "Dashboard",
                symbol: "fas fa-tachometer-alt",
                method: () => this.openDashboard()
            },
            {
                name: "Map",
                symbol: "fas fa-map-marker-alt",
                method: () => this.openMap()
            }
        ];

        return (
            <div class="main">
                <Sidebar buttons={buttons} />
                <div class="mainContainer">
                    <Title name={this.state.title} status={selected && selected !== -1 ? devices[selected].status : -1} />
                    {content}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
