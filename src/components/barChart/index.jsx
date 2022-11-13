import ReactEcharts from "echarts-for-react";
import React from "react";

// type title = {
//   text: string;
//   textAlign: string;
//   left: string;
// };

// type xAxis = {
//   type: string;
//   name: string;
//   nameLocation: string;
//   nameGap: number;
//   data: number[];
// };

// type BarChart = {
//   title: title;
//   xAxis: xAxis;
// };

const BarChart = (props) => {
  const [barChartData, setBarChartData] = React.useState({});

  React.useEffect(() => {
    prepareBarChartData();
  }, []);

  const prepareBarChartData = () => {
    const map = new Map();
    props.data.forEach((item) => {
      if (map.has(item.Alcohol)) {
        map.get(item.Alcohol).count += 1;
        map.get(item.Alcohol).totalMalicAcid += item["Malic Acid"];
      } else {
        map.set(item.Alcohol, {
          count: 1,
          totalMalicAcid: item["Malic Acid"],
        });
      }
    });

    const averageMalicAcidPerAlcohol = () => {
      const averageMalicAcidArray = [];
      for (let [, value] of Array.from(map.entries())) {
        averageMalicAcidArray.push(value.totalMalicAcid / value.count);
      }
      return averageMalicAcidArray;
    };

    let tempData = {
      title: {
        text: "Average Malic Acid Concentration",
        textAlign: "auto",
        left: "center",
      },
      xAxis: {
        type: "category",
        name: "Alcohol Types",
        nameLocation: "middle",
        nameGap: 30,
        data: [...Array.from(map.keys())],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "Concentration",
          nameRotate: 90,
          nameLocation: "middle",
          nameGap: 20,
        },
      ],
      series: [
        {
          name: "name",
          type: "bar",
          data: averageMalicAcidPerAlcohol(),
          barWidth: "40%",
        },
      ],
    };
    setBarChartData(tempData);
  };

  return (
    barChartData?.series && (
      <ReactEcharts
        style={{
          height: "100%",
          width: "100%",
        }}
        option={barChartData}
      />
    )
  );
};

export default BarChart;
