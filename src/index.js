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
import Login from "./body/login/Login";
import DeviceManager from "./body/deviceManager/DeviceManager";
import {HubConnectionBuilder, LogLevel} from "@aspnet/signalr";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTitle = "Smart Transport";
        this.interval = false;
        this.state = {
            shown: "Loading",
            devices: [],
            selected: -1,
            title: this.defaultTitle,
            loggedIn: false
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

    openLogin() {
        this.setState({
            shown: "Login",
            selected: -1,
            title: this.defaultTitle,
            loggedIn: false
        });
    }

    enterData(data, id, value, status) {
        for (let i in data) {
            if (data[i].id === id) {
                if (Array.isArray(value)) {
                    data[i].status = 0;
                    for (let j in data[i].value) {
                        let subData = data[i].value[j];
                        for (let k in value) {
                            if (subData.id === value[k].id) {
                                subData.value = value[k].value;
                                subData.status = value[k].status;
                                subData.available = true;
                            }
                        }
                        if (subData.status > data[i].status) {
                            data[i].status = subData.status;
                        }
                    }
                } else {
                    data[i].status = status;
                    data[i].value = value;
                }
                if (data[i].available) {
                    data[i].history.push({
                        timestamp: data[i].timestamp,
                        value: JSON.parse(JSON.stringify(data[i].value))
                    });
                    if (data[i].history.length > 100) {
                        data[i].history.shift();
                    }
                } else {
                    data[i].available = true;
                }
                data[i].timestamp = new Date();
                return;
            }
        }
    }

    createValues() {
        this.editDevices(newDevices => {
            for (let i = 0; i < newDevices.length; i++) {
                //mockedData START
                let conValue = Math.floor(Math.random() * 500);
                let conStatus = conValue < 400 ? 1 : 2;
                this.enterData(newDevices[i].data, "con", conValue, conStatus);

                let tremValue = Math.floor(Math.random() * 5);
                let tremStatus = tremValue < 4 ? 1 : tremValue < 5 ? 2 : 3;
                this.enterData(
                    newDevices[i].data,
                    "tre",
                    tremValue,
                    tremStatus
                );

                let humValue = Math.floor(Math.random() * 100);
                let humStatus = humValue < 75 ? 1 : humValue < 90 ? 2 : 3;
                this.enterData(newDevices[i].data, "hum", humValue, humStatus);

                let tempValue = Math.floor(Math.random() * 45 - 10);
                let tempStatus =
                    0 < tempValue && tempValue < 25
                        ? 1
                        : -5 < tempValue && tempValue < 30
                        ? 2
                        : 3;
                this.enterData(
                    newDevices[i].data,
                    "tem",
                    tempValue,
                    tempStatus
                );

                let cpuValue = Math.floor(Math.random() * 100);
                let cpuStatus = cpuValue < 75 ? 1 : cpuValue < 90 ? 2 : 3;
                let ramValue = Math.floor(Math.random() * 100);
                let ramStatus = ramValue < 75 ? 1 : ramValue < 90 ? 2 : 3;
                let aSValue = Math.floor(Math.random() * 5 + 1);
                let aSStatus = aSValue < 2 ? 3 : aSValue < 3 ? 2 : 1;
                this.enterData(newDevices[i].data, "sys", [
                    {
                        id: "cpu",
                        value: cpuValue,
                        status: cpuStatus
                    },
                    {
                        id: "ram",
                        value: ramValue,
                        status: ramStatus
                    },
                    {
                        id: "acs",
                        value: aSValue,
                        status: aSStatus
                    }
                ]);
                let latValue = Math.random() * 6 + 48;
                let lonValue = Math.random() * 6 + 7;
                let gpsStatus = 1;
                this.enterData(
                    newDevices[i].data,
                    "gps",
                    { lon: lonValue, lat: latValue },
                    gpsStatus
                );
                //mockedData END

                let maxStatus = 0;
                for (let j in newDevices[i].data) {
                    let singleData = newDevices[i].data[j];
                    if (singleData.status > maxStatus && singleData.active) {
                        maxStatus = singleData.status;
                    }
                }
                newDevices[i].status = maxStatus;
            }
        });
    }

    editDevices(edit) {
        let newDevices = [...this.state.devices];
        edit(newDevices);
        this.setState({
            devices: newDevices
        });
    }

    newEmptyDevice() {
        return {
            id: "",
            name: "",
            status: 0,
            data: [
                {
                    id: "con",
                    name: "Verbindung",
                    available: false,
                    suffix: "ms",
                    status: 0,
                    active: true,
                    fixed: true,
                    minimum: 0,
                    history: []
                },
                {
                    id: "tre",
                    name: "Erschütterungen",
                    available: false,
                    status: 0,
                    minimum: 0,
                    history: []
                },
                {
                    id: "hum",
                    name: "Feuchtigkeit",
                    available: false,
                    suffix: "%",
                    status: 0,
                    minimum: 0,
                    maximum: 100,
                    history: []
                },
                {
                    id: "tem",
                    name: "Temperatur",
                    available: false,
                    suffix: "°c",
                    status: 0,
                    history: []
                },
                {
                    id: "sys",
                    name: "System",
                    value: [
                        {
                            id: "cpu",
                            name: "CPU",
                            suffix: "%",
                            status: 0,
                            active: true
                        },
                        {
                            id: "ram",
                            name: "RAM",
                            suffix: "%",
                            status: 0,
                            active: true
                        },
                        {
                            id: "acs",
                            name: "Aktive Sensoren",
                            status: 0,
                            nograph: true,
                            active: true
                        }
                    ],
                    available: false,
                    status: 0,
                    minimum: 0,
                    maximum: 100,
                    suffix: "%",
                    active: true,
                    fixed: true,
                    history: []
                },
                {
                    id: "gps",
                    name: "Position",
                    available: false,
                    status: 0,
                    positionData: true,
                    nograph: true,
                    history: []
                }
            ]
        };
    }

    componentDidMount() {
        this.openLogin();
        if (this.interval) {
            clearInterval(this.interval);
        }
        //this.interval = setInterval(() => this.createValues(), 1000);


        const hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/valueHub")
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection.start().then(function() {
                console.log("connected");
            });
            this.state.hubConnection.on("ReceiveMessage", (user, message) => {
                console.log(user + ": " + message);
            });
        });
    }

    render() {
        let content;
        let selected = this.state.selected;
        let devices = this.state.devices;
        let shown = this.state.shown;

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

        let title = (
            <Title
                name={this.state.title}
                status={
                    selected != null && selected !== -1
                        ? devices[selected].status
                        : -1
                }
            />
        );
        let sidebar = (
            <Sidebar buttons={buttons} logout={() => this.openLogin()} />
        );

        if (shown === "Loading") {
            content = <Loading />;
        } else if (shown === "Dashboard") {
            content = (
                <Dashboard
                    devices={devices}
                    onClick={device => this.openDetails(device)}
                    newDevice={() => {
                        let devices = this.state.devices.concat(
                            this.newEmptyDevice()
                        );
                        this.setState({
                            shown: "DeviceManager",
                            devices: devices,
                            selected: devices.length - 1
                        });
                    }}
                />
            );
        } else if (shown === "Map") {
            let zoom = 6.5;
            let coordinates = { lat: 51.1657, lon: 10.4515 };
            content = (
                <MapContainer
                    devices={this.state.devices}
                    zoom={zoom}
                    coordinates={coordinates}
                />
            );
        } else if (shown === "Device") {
            content = (
                <DeviceDetails
                    device={devices[selected]}
                    editDevice={() => {
                        this.setState({ shown: "DeviceManager" });
                    }}
                />
            );
        } else if (shown === "Login") {
            content = <Login onclick={() => this.openDashboard()} />;
            sidebar = "";
        } else if (shown === "DeviceManager") {
            content = (
                <DeviceManager
                    device={
                        selected != null && selected !== -1
                            ? devices[selected]
                            : false
                    }
                    id={selected}
                    error={() => this.openDashboard()}
                    done={id => this.openDetails(id)}
                    changeId={(value, id) => {
                        this.editDevices(devices => {
                            devices[id].id = value;
                        });
                    }}
                    changeName={(value, id) => {
                        this.editDevices(devices => {
                            devices[id].name = value;
                        });
                    }}
                    changeData={(value, id) => {
                        this.editDevices(devices => {
                            devices[id].data = value;
                        });
                    }}
                />
            );
        } else {
            content = <Error />;
        }

        return (
            <div class="main">
                {sidebar}
                <div class="mainContainer">
                    {title}
                    {content}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
