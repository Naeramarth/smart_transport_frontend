import React from "react";

class NewDevice extends React.Component {
    render() {
        return (
            <div className="newDeviceWrapper">
                <div className="newDevice" onClick={() => this.props.onclick()}>
                    <i className="fas fa-plus-circle" />
                </div>
            </div>
        );
    }
}

export default NewDevice;
