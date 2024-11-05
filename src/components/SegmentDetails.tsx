interface SegmentProps {
  coords: number[][];
  distance: number[];
}

const SegmentDetails: React.FC<SegmentProps> = ({ coords, distance }) => {
  console.log("SD coords", coords)
  console.log("SD distance", distance)
  const segmentDetails = coords.map((seg, index) => {
    return (
      <div key={index}>
        <p>{`${seg[0].toFixed(3)} - ${seg[1].toFixed(3)}`}</p>
        {distance.length ? <p>{distance[index - 1]}</p> : null}
      </div>
    )
  })
  return (
    <div>
      {coords.length > 1 ? segmentDetails : null}
    </div>
  )
}

export default SegmentDetails