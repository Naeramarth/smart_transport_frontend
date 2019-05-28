import React from "react";

class Status extends React.Component {
    render() {
        let color = this.props.color;
        return (
            <div class={color}>
                <i class="fas fa-circle" />
            </div>
        );
    }
}

export default Status;
