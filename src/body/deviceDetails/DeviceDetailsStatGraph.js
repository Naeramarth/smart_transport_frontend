import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DeviceDetailsStatGraph extends React.Component {
    render() {
        let history = this.props.history;
        let data = [];
        let dataPoints = [];
        for (let entry of history) {
            dataPoints.push({ x: entry.timestamp, y: entry.value });
        }
        data.push({
            xValueFormatString: "DD.MM.YY HH:mm:ss",
            type: "spline",
            dataPoints: dataPoints
        });
        const options = {
            animationEnabled: true,
            axisX: {
                valueFormatString: "DD.MM.YY HH:mm:ss"
            },
            axisY: {
                suffix: this.props.suffix ? this.props.suffix : "",
                prefix: this.props.prefix ? this.props.prefix : "",
                minimum: this.props.minimum ? this.props.minimum : null,
                maximum: this.props.maximum ? this.props.maximum : null,
                includeZero:
                    this.props.minimum === 0 || this.props.maximum === 0
                        ? true
                        : false
            },
            data: data
        };
        return (
            <div className="graphWrapper">
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default DeviceDetailsStatGraph;
