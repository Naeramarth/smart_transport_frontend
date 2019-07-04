import React from "react";

class Status extends React.Component {
    render() {
        let color = this.props.color;
        return (
            <div className={color}>
                <i className="fas fa-circle" />
            </div>
        );
    }
}

export default Status;
