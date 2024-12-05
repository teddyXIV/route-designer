import { useMemo, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { createTicks } from '../helpers/routeGraphHelpers';

interface DataPoint {
  x: number;
  y: number;
}

interface GraphProps {
  allElevations: number[];
  routePoints: number;
  graphWidth: number;
  graphHeight: number
}


const RouteGraph: React.FC<GraphProps> = ({ allElevations, routePoints, graphWidth, graphHeight }) => {

  const [elevMax, setElevMax] = useState<number>(100)

  const xValues = Array.from({ length: routePoints }, (_, i) => i);

  useEffect(() => {
    const newMax = Math.max(...allElevations)
    setElevMax(newMax)

  }, [allElevations])

  const chartData = xValues.map((value, i) => {
    return { x: value, y: allElevations[i] }
  })


  // Memoized X-axis and Y-axis ticks
  // const xTicks = useMemo(() => createTicks([0, 100], [10, (graphWidth)]), [graphWidth]);
  const yTicks = useMemo(() => createTicks([0, elevMax], [200, 0]), [elevMax]);

  // Scales
  const xScale = useMemo(() => d3.scaleLinear().domain([0, routePoints]).range([10, (graphWidth - 40)]), [routePoints, graphWidth]);
  const yScale = useMemo(() => d3.scaleLinear().domain([0, elevMax]).range([graphHeight, 0]), [yTicks]);

  const areaGraph = useMemo(() => {
    const areaGenerator = d3.area<DataPoint>()
      // .x(d => xScale(d.x))
      .x(d => xScale(d.x))
      .y0(yScale(0))
      // .y1(d => yScale(d.y))
      .y1(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    return areaGenerator(chartData) || undefined;
  }, [chartData, xScale, yScale])

  return (
    <svg width={graphWidth - 40} height="220">
      {/* X-axis line */}
      <line x1="10" y1="200" x2={graphWidth} y2="200" stroke="currentColor" />

      {/* Y-axis line */}
      <line x1="10" y1="0" x2="10" y2="200" stroke="currentColor" />

      {/* X-axis ticks */}
      {/* {xTicks.map(({ value, offset }) => (
        <g key={value} transform={`translate(${offset}, 200)`}>
          <line y2="6" stroke="currentColor" />
          <text style={{ fontSize: '10px', textAnchor: 'middle' }} dy="1em">
            {value}
          </text>
        </g>
      ))} */}

      {/* Y-axis ticks */}
      {/* {yTicks.map(({ value, offset }) => (
        <g key={value} transform={`translate(10, ${offset})`}>
          <line x2="-6" stroke="currentColor" />
          <text style={{ fontSize: '10px', textAnchor: 'end' }} dx="-0.5em" dy="0.35em">
            {value}
          </text>
        </g>
      ))} */}

      <path d={areaGraph} fill='#37FF8B' fillOpacity="0.7" stroke="none" />

    </svg>
  );
};

export default RouteGraph;
