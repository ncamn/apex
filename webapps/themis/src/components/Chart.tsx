import React, { useState, FunctionComponent, useEffect } from "react";

import colors from "../colors";

const getXMax = (data: any[]) => {
  return data ? data.length : 0;
}

const getYMin = (data: any[], type: string) => {
  let yMin = 0;

  if (data && data.length) {
    if (type === "ohlc" || type === "candlestick")
      yMin = data.reduce((a, b) => {
        return a.low < b.low ? a : b;
      }).low;
    else
      yMin = data.reduce((a, b) => {
        return a < b ? a : b;
      });
  }
  return yMin;
}

const getYMax = (data: any[], type: string) => {
  let yMax = 0;

  if (data && data.length) {
    if (type === "ohlc" || type === "candlestick")
      yMax = data.reduce((a, b) => {
        return a.high < b.high ? b : a;
      }).high;
    else
      yMax = data.reduce((a, b) => {
        return a < b ? b : a;
      });
  }

  return yMax;
}

interface Props {
  data: any[]
  height: number
  type: string
  width: number
}

const Chart: FunctionComponent<Props> = ({ data, height, type, width }) => {
  // Canvas dimensions
  const [canvas, setCanvas] = useState({
    height,
    width
  })

  const xMax = getXMax(data)
  const xMin = 0
  const xInterval = xMax - xMin
  const xWidth = 10

  const yMax = getYMax(data, type)
  const yMin = getYMin(data, type)
  const yInterval = yMax - yMin
  const yWidth = 20


  const [graph, setGraph] = useState({
    height: canvas.height - yWidth,
    width: canvas.width - xWidth
  })

  const xScale = graph.width / xInterval;
  let x = {
    interval: xInterval,
    scale: xScale,
    max: xMax,
    min: xMin,
    width: xWidth
  };

  const yScale = graph.height / yInterval;
  let y = {
    interval: yInterval,
    scale: yScale,
    max: yMax,
    min: yMin,
    width: yWidth
  };

  const drawBar = (context) => {
    context.beginPath();

    data.forEach((y, index) => {
      context.moveTo(index * x.scale, 0);

      context.lineTo(index * x.scale, y * y.scale);
    });

    context.stroke();
    context.closePath();
  }

  const drawCandleStick = (context) => {
    data.forEach((ohlc, index) => {
      context.beginPath();
      context.strokeStyle =
        ohlc.open < ohlc.close ? colors.bearish : colors.bullish;

      context.moveTo(
        index * x.scale,
        (ohlc.low - y.min) * y.scale
      );

      context.lineTo(
        index * x.scale,
        (ohlc.high - y.min) * y.scale
      );

      context.stroke();
      context.closePath();
    });
  }

  const drawLine = (context) => {
    context.beginPath();

    data.forEach((y, index) => {
      context.lineTo(
        index * x.scale,
        (y - y.min) * y.scale
      );
    });

    context.stroke();
    context.closePath();
  }

  const drawOHLC = (context) => {
    data.forEach((ohlc, index) => {
      context.beginPath();

      context.strokeStyle =
        ohlc.open < ohlc.close ? colors.bearish : colors.bullish;

      context.moveTo(
        index * x.scale,
        (ohlc.low - y.min) * y.scale
      );

      context.lineTo(
        index * x.scale,
        (ohlc.high - y.min) * y.scale
      );

      context.stroke();
      context.closePath();
    });
  }

  const drawAxis = (context) => {
    // Draw y axis labels
    const yLabelsCount = 10;

    for (let i = 0; i <= yLabelsCount; i++) {
      context.fillText(
        Math.floor(
          y.max - (i * y.interval * yLabelsCount) / 100
        ).toString(),
        0,
        (i * graph.height) / yLabelsCount
      );
    }

    // Translate origin at bottom
    context.translate(y.width, graph.height);

    // Draw x axis labels
    for (let i = 0; i <= data.length; i += 10) {
      context.fillText(i.toString(), i * x.scale, 5);
    }

    // Reverse y axis and adjust origin padding
    context.transform(1, 0, 0, -1, 0, 0);
    context.translate(0, x.width);
    context.beginPath();

    // Draw x axis
    context.moveTo(0, 0);
    context.lineTo(graph.width, 0);

    // Draw y axis
    //context.moveTo(0, 0);
    //context.lineTo(0, canvas.height);

    context.stroke();
    context.closePath();
  }

  const draw = () => {
    let context = this.refs.canvas.getContext("2d");

    // Set default drawing color
    context.fillStyle = colors.foreground;
    context.strokeStyle = colors.foreground;

    // Save canvas initial state and clear drawing area
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawAxis(context);

    // Draw chart
    switch (type) {
      case "bar":
        drawBar(context);
        break;
      case "candlestick":
        drawCandleStick(context);
        break;
      case "line":
        drawLine(context);
        break;
      case "ohlc":
        drawOHLC(context);
        break;
      default:
        break;
    }

    // Restore origin and landmark
    context.restore();
  }

  const componentWillReceiveProps = (nextProps) => {
    // Canvas dimensions
    const canvas = {
      height: nextProps.height,
      width: nextProps.width
    };

    // x axis
    let x = {
      max: getXMax(nextProps.data),
      min: 0,
      width: 10
    };
    x.interval = x.max - x.min;

    // y axis
    let y = {
      max: getYMax(nextProps.data, nextProps.type),
      min: getYMin(nextProps.data, nextProps.type),
      width: 20
    };
    y.interval = y.max - y.min;

    // Graph dimensions
    const graph = {
      height: canvas.height - y.width,
      width: canvas.width - x.width
    };

    x.scale = graph.width / x.interval;
    y.scale = graph.height / y.interval;

    setCanvas(canvas)
    setGraph(graph)
    this.setState({
      x: x,
      y: y
    });
  }

  useEffect(() => {
    if (data)
      draw()
  })

  const handleMouseMove = (e) => {
    /*
        let context = this.refs.canvas.getContext('2d');
        let rect = this.refs.canvas.getBoundingClientRect();
  
        console.log(e.clientX - rect.left, e.clientY - rect.top);
        */
  }

  return (
    <canvas
      height={canvas.height}
      width={canvas.width}
      ref="canvas"
      onMouseMove={handleMouseMove}
    />
  );
}

// Chart.propTypes = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired
// };

export default Chart;
