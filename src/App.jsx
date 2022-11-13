import React from "react";
import "./App.css";
import data from "./assets/Wine-Data.json";
import BarChart from "./components/barChart";
import ScatterPlot from "./components/scatterChart";

function App() {
  const [activePlot, setActivePlot] = React.useState("scatter");

  // This function will change the active graph on the screen
  const changePlot = () => {
    if (activePlot === "scatter") {
      setActivePlot("bar");
    } else {
      setActivePlot("scatter");
    }
  };

  return (
    <div className="App">
      <button className="toggle" onClick={changePlot}>
        Show {activePlot === "scatter" ? "Bar" : "Scatter"}
      </button>
      {activePlot === "scatter" ? (
        <ScatterPlot data={data} />
      ) : (
        <BarChart data={data} />
      )}
    </div>
  );
}

export default App;
