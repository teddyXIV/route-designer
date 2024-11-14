import * as d3 from "d3";

export const createTicks = (domain: number[], range: number[]) => {
  const scale = d3.scaleLinear().domain(domain).range(range);
  return scale.ticks().map((value) => ({
    value,
    // offset: orientation === 'x' ? scale(value) : scale(value),
    offset: scale(value),
  }));
};