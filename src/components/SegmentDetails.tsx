interface SegmentProps {
  distance: number[];
}

const SegmentDetails: React.FC<SegmentProps> = ({ distance }) => {

  // console.log("seg details distance: ", distance)

  const segmentDetails = distance.map((dist, index) => {
    return (
      <div key={index} className="py-1">
        <p className="text-sm text-white/60">Segment {index + 1}</p>
        <p className="text-lg">{dist} meters</p>
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