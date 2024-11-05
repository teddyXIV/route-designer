interface SegmentProps {
  coords: number[][];
}

const SegmentDetails: React.FC<SegmentProps> = ({ coords }) => {
  console.log(coords)
  const segmentDetails = coords.map(seg => {
    return (
      <div>
        <p>{`${seg[0].toFixed(3)} - ${seg[1].toFixed(3)}`}</p>
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