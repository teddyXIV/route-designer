import { useMemo } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

interface GraphProps {
  allElevations: number[];
  routePoints: number;
}


const RouteGraph: React.FC<GraphProps> = ({ allElevations, routePoints }) => {

  const xValues = Array.from({ length: routePoints }, (_, i) => i);

  const elevMax = allElevations.length > 0 ? Math.max(...allElevations) : 100;

  const chartData = xValues.map((value, i) => {
    return { x: value, y: allElevations[i] }
  })
  console.log(allElevations);
  console.log("charData: ", chartData)

  // Utility function to create scale and ticks
  const createTicks = (domain: number[], range: number[]) => {
    const scale = d3.scaleLinear().domain(domain).range(range);
    return scale.ticks().map((value) => ({
      value,
      // offset: orientation === 'x' ? scale(value) : scale(value),
      offset: scale(value),
    }));
  };

  // Memoized X-axis and Y-axis ticks
  const xTicks = useMemo(() => createTicks([0, 100], [10, 290]), []);
  const yTicks = useMemo(() => createTicks([0, 100], [200, 0]), []);

  // Scales
  const xScale = useMemo(() => d3.scaleLinear().domain([0, 100]).range([10, 290]), []);
  const yScale = useMemo(() => d3.scaleLinear().domain([0, elevMax]).range([200, 0]), []);

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
    <svg width="300" height="220">
      {/* X-axis line */}
      <line x1="10" y1="200" x2="290" y2="200" stroke="currentColor" />

      {/* Y-axis line */}
      <line x1="10" y1="0" x2="10" y2="200" stroke="currentColor" />

      {/* X-axis ticks */}
      {xTicks.map(({ value, offset }) => (
        <g key={value} transform={`translate(${offset}, 200)`}>
          <line y2="6" stroke="currentColor" />
          <text style={{ fontSize: '10px', textAnchor: 'middle' }} dy="1em">
            {value}
          </text>
        </g>
      ))}

      {/* Y-axis ticks */}
      {yTicks.map(({ value, offset }) => (
        <g key={value} transform={`translate(10, ${offset})`}>
          <line x2="-6" stroke="currentColor" />
          <text style={{ fontSize: '10px', textAnchor: 'end' }} dx="-0.5em" dy="0.35em">
            {value}
          </text>
        </g>
      ))}

      <path d={areaGraph} fill='#37FF8B' fillOpacity="0.7" stroke="none" />

    </svg>
  );
};

export default RouteGraph;
