import React from "react";

class Sidebar extends React.Component {
    render() {
        let shownButtons = this.props.buttons.map(button => (
            <div class="sidebarButtonWrapper" key={button.name} onClick={button.method}>
                <div class="sidebarButton">
                    <i class={button.symbol} />
                </div>
            </div>
        ));

        return <div class="sidebar">{shownButtons}</div>;
    }
}

export default Sidebar;