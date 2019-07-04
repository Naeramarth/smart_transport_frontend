import React from "react";

class SensorSelector extends React.Component {
    render() {
        if (this.props.fixed) {
            return "";
        }
        let active = this.props.active;
        let content = <i className="far fa-square" />;
        if (active) {
            content = <i className="far fa-check-square" />;
        }

        return (
            <div className="sensorSelector">
                <div className="label">{this.props.name}</div>
                <div className="checkboxWrapper">
                    <div
                        className="checkbox"
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
