import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Sidebar from "./sidebar/Sidebar";
import Title from "./body/Title";
import Dashboard from "./body/dashboard/Dashboard";
import DeviceDetails from "./body/deviceDetails/DeviceDetails";
import Map from "./body/map/Map";
import Error from "./Error";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: "Dashboard"
        };
    }

    render() {
        let content;
        if (this.state.shown === "Dashboard") {
            content = <Dashboard />;
        } else if (this.state.shown === "Map") {
            content = <Map />;
        } else if (this.state.shown === "Device") {
            content = <DeviceDetails />;
        } else {
            content = <Error />;
        }

        let buttons = [
            {
                name: "Dashboard",
                symbol: "fas fa-tachometer-alt"
            },
            {
                name: "Map",
                symbol: "fas fa-map-marker-alt"
            }
        ];
        return (
            <div class="main">
                <Sidebar buttons={buttons} />
                <div class="mainContainer">
                    <Title name="Smart Transport" />
                    {content}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
