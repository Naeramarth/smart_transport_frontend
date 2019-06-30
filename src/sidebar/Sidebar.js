import React from "react";
import LogoutButton from "./LogoutButton";

class Sidebar extends React.Component {
    render() {
        let shownButtons = this.props.buttons.map(button => (
            <div
                class="sidebarButtonWrapper"
                key={button.name}
                onClick={button.method}
            >
                <div class="sidebarButton">
                    <i class={button.symbol} />
                </div>
            </div>
        ));

        return (
            <div class="sidebar">
                <div class="sidebarButtons">{shownButtons}</div>
                <LogoutButton onclick={() => this.props.logout()} />
            </div>
        );
    }
}

export default Sidebar;
