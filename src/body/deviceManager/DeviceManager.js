import React from "react";
import SensorSelector from "./SensorSelector";

class DeviceManager extends React.Component {
    constructor(props) {
        super(props);
        this.changedSensors = [];
    }

    changeSensor(id, device) {
        device.data[id].active = !device.data[id].active;
        for (let i in this.changedSensors) {
            if (this.changedSensors[i].id === device.data[id].id) {
                this.changedSensors.splice(i, 1);
                return;
            }
        }
        this.changedSensors.push({
            id: device.data[id].id,
            active: device.data[id].active
        });
    }

    render() {
        let device = this.props.device;
        if (!device) {
            this.props.error();
        }

        let sensors = device.data.map((data, index) => (
            <SensorSelector
                name={data.name}
                active={data.active}
                fixed={data.fixed}
                id={data.id}
                key={index}
                index={index}
                onclick={id => {
                    this.changeSensor(id, device);
                    this.props.changeData(device.data, this.props.id);
                }}
            />
        ));

        return (
            <div className="deviceManager">
                <div className="deviceManagerElement">
                    <div className="label">Gerätname</div>
                    <div className="deviceManagerInputWrapper">
                        <input
                            className="devicename deviceNameInput"
                            value={device.name}
                            onChange={event =>
                                this.props.changeName(
                                    event.target.value,
                                    this.props.id
                                )
                            }
                        />
                    </div>
                </div>
                <div className="sensorSelectionWrapper">
                    <div className="label">Sensoren</div>
                    <div className="sensorSelection">{sensors}</div>
                </div>
                <div
                    className="doneButton"
                    onClick={() =>
                        this.props.done(this.props.id, this.changedSensors)
                    }
                >
                    Fertig
                </div>
            </div>
        );
    }
}

//TODO: "Fertig" button -> geht zum neuen/bearbeiteten Gerät
//alle änderungen in real time
//beim neuen Erstellen: sofort neues gerät mit unknown values anlegen
//Anlegen und bearbeiten splitten

export default DeviceManager;
