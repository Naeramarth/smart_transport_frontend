import React from "react";
import LogoutButton from "./LogoutButton";

class Sidebar extends React.Component {
    render() {
        let shownButtons = this.props.buttons.map(button => (
            <div
                className="sidebarButtonWrapper"
                key={button.name}
                onClick={button.method}
            >
                <div className="sidebarButton">
                    <i className={button.symbol} />
                </div>
            </div>
        ));

        return (
            <div className="sidebar">
                <div className="sidebarButtons">{shownButtons}</div>
                <LogoutButton onclick={() => this.props.logout()} />
            </div>
        );
    }
}

export default Sidebar;
