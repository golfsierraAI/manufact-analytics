import ReactEcharts from "echarts-for-react";
import React from "react";
const ScatterPlot = (props) => {
  const [scatterPlotData, setScatterPlotData] = React.useState([]);

  React.useEffect(() => {
    prepareScatterPlotData();
  }, []);

  const prepareScatterPlotData = () => {
    let tempData = {
      title: {
        text: "Color Intensity vs. Hue",
        textAlign: "auto",
        left: "center",
      },
      xAxis: {
        name: "Color Intensity",
        interval: 0.5,
        nameLocation: "middle",
        nameGap: 30,
      },
      yAxis: {
        name: "Hue",
        interval: 1,
        nameRotate: 90,
        nameLocation: "middle",
        nameGap: 20,
      },
      series: [
        {
          data: [],
          symbolSize: 10,
          type: "scatter",
        },
      ],
    };
    tempData.series[0].data = props.data.map((item) => {
      return [item["Color intensity"], item.Hue];
    });
    setScatterPlotData({ ...tempData });
  };

  return (
    scatterPlotData?.series && (
      <ReactEcharts
        style={{
          height: "100%",
          width: "100%",
        }}
        option={scatterPlotData}
      />
    )
  );
};

export default ScatterPlot;
