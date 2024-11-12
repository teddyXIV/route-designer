interface SegmentProps {
  distance: number[];
  elevations: number[][];
}

const SegmentDetails: React.FC<SegmentProps> = ({ distance, elevations }) => {

  // console.log("seg details distance: ", distance)

  const segmentDetails = distance.map((dist, index) => {
    const maxElev = Math.max(...elevations[index])

    return (
      <div key={index} className="py-1">
        <p className="text-sm text-white/60">Segment {index + 1}</p>
        <p className="text-lg">{dist}m</p>
        <p className="text-sm text-white/60">Max elevation above sea level:</p>
        <p className="text-lg">{maxElev}m</p>
      </div>
    )
  })
  return (
    <div className="p-2 divide-y divide-secondary">
      {segmentDetails}
    </div>
  )
}

export default SegmentDetails;