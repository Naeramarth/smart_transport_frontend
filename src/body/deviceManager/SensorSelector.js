import React from "react";

class SensorSelector extends React.Component {
    render() {
        if (this.props.fixed) {
            return "";
        }
        let active = this.props.active;
        let content = <i class="far fa-square" />;
        if (active) {
            content = <i class="far fa-check-square" />;
        }

        return (
            <div class="sensorSelector">
                <div class="label">{this.props.name}</div>
                <div class="checkboxWrapper">
                    <div
                        class="checkbox"
                        onClick={() => this.props.onclick(this.props.index)}
                    >
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

export default SensorSelector;
