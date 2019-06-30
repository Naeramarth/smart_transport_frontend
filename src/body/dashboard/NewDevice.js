import React from "react";

class NewDevice extends React.Component {
    render() {
        return (
            <div class="newDeviceWrapper">
                <div class="newDevice" onClick={() => this.props.onclick()}>
                    <i class="fas fa-plus-circle" />
                </div>
            </div>
        );
    }
}

export default NewDevice;
