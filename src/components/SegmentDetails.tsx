interface SegmentProps {
  distance: number[];
}

const SegmentDetails: React.FC<SegmentProps> = ({ distance }) => {
  // console.log("SD distance", distance)

  const segmentDetails = distance.map((dist, index) => {
    return (
      <div key={index} className="py-1">
        <p className="underline text-sm">Segment {index + 1}</p>
        <p className="text-lg">{dist}m</p>
      </div>
    )
  })
  return (
    <div className="p-2 divide-y divide-secondary">
      {segmentDetails}
    </div>
  )
}

export default SegmentDetails