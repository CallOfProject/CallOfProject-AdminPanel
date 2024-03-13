import React, {useEffect, useRef, useState} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const DrillDownChartComponent = () => {
    const chartRef = useRef(null);


    const [chartOptions, setChartOptions] = useState({
        animationEnabled: true,
        theme: "light2",
        backgroundColor: "#1c1c1c",
        color: "white",
        title: {
            color: "white",
            text: "New Users vs Existing Users"
        },
        subtitles: [{
            backgroundColor: "#2eacd1",
            fontSize: 16,
            fontColor: "white",
            padding: 5
        }],
        /*  legend: {
              fontFamily: "calibri",
              fontSize: 14,
              itemTextFormatter: function (e) {
                  return e.dataPoint.name + ": " + Math.round(localStorage.getItem("new_user") / localStorage.getItem("total_user") * 100) + "%";
              }
          },*/
        data: []
    });

    const options = {
        "New vs Returning Visitors": [{
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "New vs Returning Visitors",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                {y: localStorage.getItem("new_user"), name: "New Users", color: "#E7823A"},
                {y: localStorage.getItem("total_user"), name: "Existing Users", color: "#546BC1"}
            ]
        }],
    };

    useEffect(() => {
        setChartOptions({
            ...chartOptions,
            data: options["New vs Returning Visitors"]
        });
    }, []);

    return (
        <div>
            <CanvasJSChart
                options={chartOptions}
                onRef={ref => chartRef.current = ref}
                style={{width: "50%", height: "100px", backgroundColor: "black", color: "white"}}
            />
        </div>
    );
};

export default DrillDownChartComponent;
