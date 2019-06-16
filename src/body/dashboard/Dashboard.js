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
            //mockedData START
            let conValue =
                Math.random() < 0.1 ? false : Math.floor(Math.random() * 500);
            let conStatus = conValue < 300 ? 0 : conValue ? 1 : 2;
            let tremValue = Math.floor(Math.random() * 10);
            let tremStatus = tremValue < 2 ? 0 : tremValue < 5 ? 1 : 2;
            let humStatus = Math.floor(Math.random() * 3);
            let tempValue = Math.floor(Math.random() * 60 - 15);
            let tempStatus =
                5 < tempValue && tempValue < 25
                    ? 0
                    : -5 < tempValue && tempValue < 35
                    ? 1
                    : 2;
            let cpuValue = Math.floor(Math.random() * 100);
            let cpuStatus = cpuValue < 50 ? 0 : cpuValue < 80 ? 1 : 2;
            let ramValue = Math.floor(Math.random() * 100);
            let ramStatus = ramValue < 50 ? 0 : ramValue < 80 ? 1 : 2;
            let aSValue = Math.floor(Math.random() * 5 + 1); 
            let aSStatus = aSValue == 5 ? 0 : aSValue < 4 ? 2 : 1;
            let sysStatus = Math.max(cpuStatus, ramStatus, aSStatus);
            let mainStatus = Math.max(conStatus, tremStatus, humStatus, tempStatus, sysStatus);
            //mockedData END

            this.devices.push({
                name: "Gerät " + i,
                status: mainStatus,
                data: [
                    {
                        name: "Verbindung: ",
                        value: conStatus ? conStatus + "ms" : "Nicht Verfügbar",
                        status: conStatus
                    },
                    {
                        name: "Erschütterungen: ",
                        value: tremValue,
                        status: tremStatus
                    },
                    {
                        name: "Feuchtigkeit: ",
                        value: "??",
                        status: humStatus
                    },
                    {
                        name: "Temp: ",
                        value: tempValue + "°c",
                        status: tempStatus
                    },
                    {
                        name: "System: ",
                        value: [
                            {
                                name: "CPU: ",
                                value: cpuValue + "%",
                                status: cpuStatus
                            },
                            {
                                name: "RAM: ",
                                value: ramValue + "%",
                                status: ramStatus
                            },
                            {
                                name: "Aktive Sensoren: ",
                                value: aSValue,
                                status: aSStatus
                            }
                        ],
                        status: sysStatus
                    }
                ]
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
            content = this.devices.map((device, index) => (
                <Device
                    key={index}
                    name={device.name}
                    status={device.status}
                    data={device.data}
                />
            ));
        }

        return <div class="dashboard">{content}</div>;
    }
}

export default Dashboard;
