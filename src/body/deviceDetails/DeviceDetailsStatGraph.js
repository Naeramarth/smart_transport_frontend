import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DeviceDetailsStatGraph extends React.Component {

    createDataPoints(history) {
        let data = [];
        for (let i in history) {
            data.push({ x: history[i].timestamp, y: history[i].value });
        }
        return data;
    }

    createData(dataPoints, name){
        return {
            xValueFormatString: "DD.MM.YY HH:mm:ss",
            type: "spline",
            name: name ? name : "",
            showInLegend: name ? true : false,
            dataPoints: dataPoints
        };
    }

    render() {
        let value = this.props.value;
        let history = this.props.history;
        let data = [];
        if(Array.isArray(value)){
            for(let i in value){
                if(value[i].nograph){
                    continue;
                }
                let subHistory = [];
                for(let j in history){
                    subHistory.push({timestamp: history[j].timestamp, value: history[j].value[i].value});
                }
                data.push(this.createData(this.createDataPoints(subHistory), value[i].name));
            }
        }else{
            data.push(this.createData(this.createDataPoints(history)));
        }
        const options = {
            animationEnabled: true,
            axisX: {
                valueFormatString: "DD.MM.YY HH:mm:ss"
            },
            axisY: {
                suffix: this.props.suffix ? this.props.suffix : "",
                prefix: this.props.prefix ? this.props.prefix : "",
                minimum: this.props.minimum ? this.props.minimum :null,
                maximum: this.props.maximum ? this.props.maximum :null
            },
            data: data
        };
        return (
            <div className="graphWrapper">
                <CanvasJSChart
                    options={options}
                />
            </div>
        );
    }
}

export default DeviceDetailsStatGraph;
