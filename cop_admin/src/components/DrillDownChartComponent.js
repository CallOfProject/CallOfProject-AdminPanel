import React, {useEffect, useRef, useState} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const totalVisitors = 829500;

const DrillDownChartComponent = () => {
    const chartRef = useRef(null);

    const [chartOptions, setChartOptions] = useState({
        animationEnabled: true,
        theme: "light2",
        backgroundColor: "rgb(193, 219, 222)",
        title: {
            text: "New Users vs Existing Users"
        },
        subtitles: [{
            backgroundColor: "#2eacd1",
            fontSize: 16,
            fontColor: "white",
            padding: 5
        }],
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";
            }
        },
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
                {y: 522460, name: "New Users", color: "#E7823A"},
                {y: 307040, name: "Existing Users", color: "#546BC1"}
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
                style={{width: "50%", height: "100px", backgroundColor: "black"}}
            />
        </div>
    );
};

export default DrillDownChartComponent;
