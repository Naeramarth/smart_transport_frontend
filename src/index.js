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
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTitle = "Smart Transport";
        this.interval = false;
        this.uid = 1;
        this.state = {
            shown: "Loading",
            devices: [],
            selected: -1,
            title: this.defaultTitle,
            loggedIn: false,
            customer: "",
            sidebar: false
        };
    }

    status(data) {
        if (data.status >= 200 && data.status < 300) {
            return Promise.resolve(data);
        } else {
            return Promise.reject(new Error(data.statusText));
        }
    }

    json(data) {
        return data.json();
    }

    restCall(path, callback, errorCallback, method, body) {
        fetch("http://localhost:5000/api/" + path, {
            method: method ? method : "get",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(this.status)
            .then(this.json)
            .then(data => {
                if (callback) {
                    callback(data);
                }
            })
            .catch(function(error) {
                if (errorCallback) {
                    errorCallback();
                }
            });
    }

    openDetails(device, callback) {
        this.setState(
            {
                shown: "Device",
                selected: device,
                title: this.state.devices[device].name,
                sidebar: true
            },
            () => callback()
        );
    }

    openDashboard(callback) {
        this.setState(
            {
                shown: "Dashboard",
                selected: -1,
                title: this.defaultTitle,
                sidebar: true
            },
            () => callback()
        );
    }

    openMap(callback) {
        this.setState(
            {
                shown: "Map",
                selected: -1,
                title: this.defaultTitle,
                sidebar: true
            },
            () => callback()
        );
    }

    openLogin(callback, error) {
        this.setState(
            {
                shown: "Login",
                selected: -1,
                title: this.defaultTitle,
                loggedIn: false,
                sidebar: false,
                loginError: error,
                customer: ""
            },
            () => callback()
        );
    }

    openLoading(callback) {
        this.setState(
            {
                shown: "Loading"
            },
            () => callback()
        );
    }

    openDeviceManager(callback) {
        this.setState({ shown: "DeviceManager", sidebar: false }, () =>
            callback()
        );
    }

    enterData(deviceId, id, value, timestamp, callback) {
        this.editDeviceData(
            deviceId,
            id,
            data => {
                if (value === undefined || value === null) {
                    return;
                }
                if (data.positionData) {
                    value.lat = value.lat / 1000000000;
                    value.lon = value.lon / 1000000000;
                    if (isNaN(value.lat) || isNaN(value.lon)) {
                        return;
                    }
                }
                if (data.id === "vib") {
                    if (value) {
                        value = 1;
                    } else {
                        value = 0;
                    }
                }
                data.value = value;
                data.total += value;
                data.totalLength += 1;
                data.timestamp = timestamp;
                data.status = this.determineStatus(
                    data.total / data.totalLength,
                    value
                );
                if (data.available) {
                    data.history.push({
                        timestamp: data.timestamp,
                        value: JSON.parse(JSON.stringify(data.value))
                    });
                    if (data.history.length > 100) {
                        data.history.shift();
                    }
                } else {
                    data.available = true;
                }
                this.setDeviceStatus(deviceId);
            },
            callback
        );
    }

    determineStatus(average, value) {
        return average * 1.5 < value
            ? 3
            : average * 1.25 < value
            ? 2
            : average * 0.5 > value
            ? 3
            : average * 0.75 > value
            ? 2
            : 1;
    }

    setDeviceStatus(deviceId) {
        this.editDevice(deviceId, device => {
            let maxStatus = 0;
            for (let singleData of device.data) {
                if (singleData.status > maxStatus && singleData.active) {
                    maxStatus = singleData.status;
                }
            }
            device.status = maxStatus;
        });
    }

    editDevices(edit, callback) {
        let newDevices = [...this.state.devices];
        edit(newDevices);
        this.setState(
            {
                devices: newDevices
            },
            callback
        );
    }

    editDevice(deviceId, edit, callback) {
        this.editDevices(newDevices => {
            for (let i = 0; i < newDevices.length; i++) {
                if (newDevices[i].id === deviceId) {
                    edit(newDevices[i]);
                }
            }
        }, callback);
    }

    editDeviceData(deviceId, id, edit, callback) {
        this.editDevice(
            deviceId,
            device => {
                for (let entry of device.data) {
                    if (entry.id === id) {
                        edit(entry);
                    }
                }
            },
            callback
        );
    }

    newEmptyDevice(id, name) {
        return {
            id: id,
            name: name,
            status: 0,
            data: [
                {
                    id: "vib",
                    trigger: "ReceiveVib",
                    name: "Erschütterungen",
                    value: 0,
                    available: true,
                    status: 1,
                    minimum: 0,
                    maximum: 1,
                    history: []
                },
                {
                    id: "humid",
                    trigger: "ReceiveHum",
                    name: "Feuchtigkeit",
                    available: false,
                    suffix: "%",
                    status: 0,
                    minimum: 0,
                    maximum: 100,
                    history: []
                },
                {
                    id: "temp",
                    trigger: "ReceiveTemp",
                    name: "Temperatur",
                    available: false,
                    suffix: "°c",
                    status: 0,
                    history: []
                },
                {
                    id: "preassure",
                    trigger: "ReceivePre",
                    name: "Druck",
                    available: false,
                    suffix: "Pa",
                    status: 0,
                    history: []
                },
                {
                    id: "gps",
                    trigger: "ReceivePos",
                    name: "Position",
                    available: false,
                    status: 0,
                    positionData: true,
                    nograph: true,
                    history: []
                },
                {
                    id: "battery",
                    trigger: "ReceiveBat",
                    name: "Batterie",
                    suffix: "%",
                    available: false,
                    status: 0,
                    minimum: 0,
                    maximum: 100,
                    nograph: true,
                    active: true,
                    fixed: true
                }
            ]
        };
    }

    login(name, pw) {
        this.restCall(
            "user/" + name + "/" + pw,
            data => {
                if (!data) {
                    this.openLogin(() => {}, true);
                    return;
                }
                this.restCall(
                    "user/" + this.uid,
                    data => {
                        this.setState({ kdNr: data.KdNr }, () => {
                            this.restCall(
                                "customer/" + data.KdNr,
                                data => {
                                    this.setState(
                                        {
                                            customer: data.Name
                                        },
                                        () => {
                                            this.loadDevices(data);
                                        }
                                    );
                                },
                                () => {
                                    this.openLogin(() => {}, true);
                                }
                            );
                        });
                    },
                    () => {
                        this.openLogin(() => {}, true);
                    }
                );
            },
            () => {
                this.openLogin(() => {}, true);
            }
        );
    }

    loadDevices(data) {
        this.restCall(
            "device/" + data.KdNr,
            data => {
                for (let device of data) {
                    this.setState(
                        {
                            devices: this.state.devices.concat(
                                this.newEmptyDevice(
                                    device.Id,
                                    device.Bezeichnung
                                )
                            )
                        },
                        () => {
                            this.loadSensors(device);
                        }
                    );
                }
            },
            () => {
                this.openLogin(() => {}, true);
            }
        );
    }

    loadSensors(device) {
        this.restCall("config/" + device.Id, data => {
            this.editDevices(
                newDevices => {
                    for (let newDevice of newDevices) {
                        if (newDevice.id === device.Id) {
                            let dData = newDevice.data;
                            for (let sensor of dData) {
                                for (let result of data) {
                                    if (sensor.id === result.Sensortype) {
                                        sensor.active = true;
                                        sensor.sensorId = result.Id;
                                    }
                                }
                            }
                        }
                    }
                },
                () =>
                    this.openDashboard(() => {
                        this.loadValues();
                    })
            );
        });
    }

    loadValues() {
        for (let device of this.state.devices) {
            for (let sensor of device.data) {
                if (sensor.positionData) {
                    this.restCall("position/" + device.id, data => {
                        this.enterData(
                            device.id,
                            sensor.id,
                            { lon: data.lon, lat: data.lat },
                            new Date(data.Timestamp)
                        );
                    });
                } else {
                    this.restCall(
                        "values/" + device.id + "/" + sensor.id,
                        data => {
                            let total = 0;
                            for (let entry of data) {
                                total += entry.Value;
                            }
                            let subHistory = data.slice(0, 100).reverse();
                            let history = [];
                            for (let entry of subHistory) {
                                history.push({
                                    timestamp: new Date(entry.Timestamp),
                                    value: entry.Value
                                });
                            }
                            this.editDeviceData(
                                device.id,
                                sensor.id,
                                deviceData => {
                                    deviceData.total = total;
                                    deviceData.totalLength = data.length;
                                    deviceData.history = history;
                                },
                                () => {
                                    if (data.length === 0) {
                                        return;
                                    }
                                    this.enterData(
                                        device.id,
                                        sensor.id,
                                        data[0].Value,
                                        new Date(
                                            data[0].Timestamp
                                        )
                                    );
                                }
                            );
                        }
                    );
                }
            }
            this.setDeviceStatus(device.id);
        }
        this.startConnection();
    }

    startConnection() {
        const hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/valueshub")
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection.start();
            this.state.hubConnection.on("ReceiveVib", (user, message) => {
                this.enterData(user, "vib", message, new Date());
            });
            this.state.hubConnection.on("ReceiveHum", (user, message) => {
                this.enterData(user, "humid", message, new Date());
            });
            this.state.hubConnection.on("ReceiveTemp", (user, message) => {
                this.enterData(user, "temp", message, new Date());
            });
            this.state.hubConnection.on("ReceivePre", (user, message) => {
                this.enterData(user, "preassure", message, new Date());
            });
            this.state.hubConnection.on("ReceivePos", (user, message) => {
                this.enterData(user, "gps", message, new Date());
            });
            this.state.hubConnection.on("ReceiveBat", (user, message) => {
                this.enterData(user, "battery", message, new Date());
            });
        });
    }

    startConnectionListener(trigger, id) {
        this.state.hubConnection.on(trigger, (user, message) => {
            this.enterData(user, id, message, new Date());
        });
    }

    createDevice(devices) {
        this.restCall(
            "device",
            () => {
                this.restCall("device/" + this.state.kdNr, data => {
                    this.editDevices(devices => {
                        devices[devices.length - 1].id =
                            data[data.length - 1].Id;
                    });
                });
            },
            () => {
                this.restCall("device/" + this.state.kdNr, data => {
                    this.editDevices(devices => {
                        devices[devices.length - 1].id =
                            data[data.length - 1].Id;
                    });
                });
            },
            "post",
            {
                Bezeichnung: "",
                KdNr: this.state.kdNr
            }
        );
    }

    updateDevice(devices, id, changedSensors) {
        this.restCall("device/" + devices[id].id, () => {}, () => {}, "put", {
            Bezeichnung: this.state.devices[id].id
        });
        for (let changedSensor of changedSensors) {
            this.editDeviceData(devices[id].id, changedSensor.id, sensor => {
                if (changedSensor.active) {
                    this.restCall(
                        "config",
                        () => {
                            this.restCall("config/" + devices[id].id, data => {
                                for (let newSensor of data) {
                                    if (newSensor.Sensortype === sensor.id) {
                                        sensor.sensorId = newSensor.Id;
                                        return;
                                    }
                                }
                            });
                        },
                        () => {},
                        "post",
                        {
                            Sensortype: sensor.id,
                            deviceId: devices[id].id
                        }
                    );
                } else {
                    this.restCall(
                        "config/" + sensor.sensorId,
                        () => {},
                        () => {},
                        "delete"
                    );
                }
            });
        }
    }

    deleteDevice(id) {
        this.restCall("device/" + id, () => {}, () => {}, "delete");
    }

    resetDevice(id) {
        this.restCall(
            "device/resetDevice/" + id,
            data => {
                if (data) {
                    this.editDevice(
                        device => {
                            for (let data of device.data) {
                                data.history = [];
                                if (data.vib) {
                                    data.value = 0;
                                    data.status = 1;
                                    data.available = true;
                                } else {
                                    data.value = "";
                                    data.status = 0;
                                    data.available = false;
                                }
                            }
                        },
                        () => {
                            this.setDeviceStatus();
                        }
                    );
                }
            },
            () => {},
            "get"
        );
    }

    componentDidMount() {
        this.openLogin(() => {});
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            for (let device of this.state.devices) {
                for (let data of device.data) {
                    if (data.id === "vib") {
                        this.enterData(device.id, data.id, 0, new Date());
                    }
                }
            }
        }, 5000);
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
                method: () => this.openDashboard(() => {})
            },
            {
                name: "Map",
                symbol: "fas fa-map-marker-alt",
                method: () => this.openMap(() => {})
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
                customer={this.state.customer}
            />
        );
        let sidebar = this.state.sidebar ? (
            <Sidebar
                buttons={buttons}
                logout={() => this.openLogin(() => {})}
            />
        ) : (
            ""
        );

        if (shown === "Loading") {
            content = <Loading />;
        } else if (shown === "Dashboard") {
            content = (
                <Dashboard
                    devices={devices}
                    onClick={device => this.openDetails(device, () => {})}
                    newDevice={() => {
                        devices = this.state.devices.concat(
                            this.newEmptyDevice()
                        );
                        selected = devices.length - 1;
                        this.createDevice(devices);
                        this.setState(
                            {
                                devices: devices,
                                selected: selected
                            },
                            () => {
                                this.openDeviceManager(() => {});
                            }
                        );
                    }}
                    customer={this.state.customer}
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
                        this.openDeviceManager(() => {});
                    }}
                    deleteDevice={() => {
                        let confirmed = window.confirm(
                            "Sind Sie sicher, dass Sie dieses Gerät löschen wollen?"
                        );
                        if (!confirmed) {
                            return;
                        }
                        this.openDashboard(() => {
                            this.editDevices(devices => {
                                let deleted = devices.splice(selected, 1);
                                this.deleteDevice(deleted[0].id);
                            });
                        });
                    }}
                    resetDevice={() => {
                        let confirmed = window.confirm(
                            "Sind Sie sicher, dass Sie dieses Gerät resetten wollen?"
                        );
                        if (!confirmed) {
                            return;
                        }
                        this.resetDevice(selected);
                    }}
                />
            );
        } else if (shown === "Login") {
            content = (
                <Login
                    onclick={(name, pw) => {
                        this.login(name, pw);
                        this.openLoading(() => {});
                    }}
                    error={this.state.loginError}
                />
            );
        } else if (shown === "DeviceManager") {
            content = (
                <DeviceManager
                    device={
                        selected != null && selected !== -1
                            ? devices[selected]
                            : false
                    }
                    id={selected}
                    error={() => this.openDashboard(() => {})}
                    done={id => this.openDetails(id, () => {})}
                    changeName={(value, id) => {
                        this.editDevices(devices => {
                            devices[id].name = value;
                        });
                    }}
                    changeData={(value, id) => {
                        this.editDevices(
                            devices => {
                                devices[id].data = value;
                            },
                            () => {
                                this.setDeviceStatus(devices[selected].id);
                            }
                        );
                    }}
                    done={(id, changedSensors) => {
                        this.updateDevice(devices, id, changedSensors);
                        this.openDetails(selected, () => {});
                    }}
                />
            );
        } else {
            content = <Error />;
        }

        return (
            <div className="main">
                {sidebar}
                <div className="mainContainer">
                    {title}
                    {content}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
