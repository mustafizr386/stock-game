import React, { useState } from "react";

import * as d3 from "d3";
import "./Chart.css";
import Candle from "./Candle";
import CrossHairs from "./CrossHairs";

const Chart = props => {
  const { ticker, width: chart_width, height: chart_height, timescale } = props;
  // let { last_bar_idx = 0, bars_wide = 40 } = props;

  // last_bar_idx should default to the last bar in the data, or else be sure passed-in value doesn't exceed the last bar
  // last_bar_idx = last_bar_idx > 0 ? Math.min(last_bar_idx, data.length - 1) : data.length - 1;


  const storage = window.localStorage;

  const [mouseCoords, setMouseCoords] = useState({
    x: 0,
    y: 0
  });




  const getData = () => {

      
    if (storage.getItem("Today") && timescale === "Today") {
      const timetable = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
      const size = Object.keys(JSON.parse(storage.getItem("Today"))['Tickers'][ticker]['Prices']).length;
      const intervals = JSON.parse(storage.getItem("Today"))['Tickers'][ticker]['Prices'];
      let lastclose = null;


      return d3.range(15).map((item, i) => {

        if (i < size) {

          const open = intervals[timetable[i]]['Open'];
          const close = intervals[timetable[i]]['Close'];
          const high = intervals[timetable[i]]['High'];
          const low = intervals[timetable[i]]['Low'];
          const volume = intervals[timetable[i]]['BuyVolume'];
          lastclose = intervals[timetable[i]]['Close'];
          return {
            time: i,
            open,
            high,
            low,
            close,
            volume
          };
        }
        else {
          const open = lastclose;
          const close = lastclose;
          const high = lastclose;
          const low = lastclose;
          const volume = 0;
          return {
            time: i,
            open,
            high,
            low,
            close,
            volume
          };
        }
      });

    }
  }

  const data = getData();
  // let mouseCoords = {
  //   x: 0,
  //   y: 0
  // };

  // const setMouseCoords = (x, y) => {
  //   mouseCoords = { x, y };
  // };

  // find the high and low bounds of all the bars being sidplayed
  const dollar_high = d3.max(data.map(bar => bar.high)) * 1.05;
  const dollar_low = d3.min(data.map(bar => bar.low)) * 0.95;

  const chart_dims = {
    pixel_width: chart_width,
    pixel_height: chart_height,
    dollar_high,
    dollar_low,
    dollar_delta: dollar_high - dollar_low
  };

  const dollarAt = pixel => {
    const dollar =
      (Math.abs(pixel - chart_dims.pixel_height) / chart_dims.pixel_height) *
      chart_dims.dollar_delta +
      chart_dims.dollar_low;

    return pixel > 0 ? dollar.toFixed(2) : "-";
  };

  const pixelFor = dollar => {
    return Math.abs(
      ((dollar - chart_dims["dollar_low"]) / chart_dims["dollar_delta"]) *
      chart_dims["pixel_height"] -
      chart_dims["pixel_height"]
    );
  };

  const onMouseLeave = () => {
    setMouseCoords({
      x: 0,
      y: 0
    });
  };

  const onMouseMoveInside = e => {
    setMouseCoords({
      x:
        e.nativeEvent.x -
        Math.round(e.currentTarget.getBoundingClientRect().left),
      y:
        e.nativeEvent.y -
        Math.round(e.currentTarget.getBoundingClientRect().top)
    });
  };

  const onMouseClickInside = e => {
    console.log(`Click at ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);
  };

  // calculate the candle width
  const candle_width = Math.floor((chart_width / data.length) * 0.7);

  return (
    <svg
      width={chart_width}
      height={chart_height}
      className="chart"
      onMouseMove={onMouseMoveInside}
      onClick={onMouseClickInside}
      onMouseLeave={onMouseLeave}
    >
      {data.map((bar, i) => {
        const candle_x = (chart_width / (data.length + 1)) * (i + 1);
        return (
          <Candle
            key={i}
            data={bar}
            x={candle_x}
            candle_width={candle_width}
            pixelFor={pixelFor}
          />
        );
      })}
      <text x="10" y="16" fill="white" fontSize="10">
        <tspan>
          Mouse: {mouseCoords.x}, {mouseCoords.y}
        </tspan>
        <tspan x="10" y="30">
          Dollars: ${dollarAt(mouseCoords.y)}
        </tspan>
      </text>
      <CrossHairs x={mouseCoords.x} y={mouseCoords.y} chart_dims={chart_dims} />
    </svg>
  );
};

export default Chart;