import React from "react";
import SensorSelector from "./SensorSelector";

class DeviceManager extends React.Component {
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
                onclick={(id)=>{
                    device.data[id].active = !device.data[id].active;
                    this.props.changeData(device.data, this.props.id);
                }}
            />
        ));

        return (
            <div class="deviceManager">
                <div class="deviceManagerElement">
                    <div class="label">Gerätname</div>
                    <div class="deviceManagerInputWrapper">
                        <input
                            class="devicename deviceNameInput"
                            value={device.name}
                            onChange={(event) => this.props.changeName(event.target.value, this.props.id)}
                        />
                    </div>
                </div>
                <div class="sensorSelectionWrapper">
                    <div class="label">Sensoren</div>
                    <div class="sensorSelection">{sensors}</div>
                </div>
                <div
                    class="doneButton"
                    onClick={() => this.props.done(this.props.id)}
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
