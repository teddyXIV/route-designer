interface MapPostProps {
  image: string;
  title: string;
  distance: string;
  elevation: string;
  difficulty: string;
}

const MapPost: React.FC<MapPostProps> = ({ image, title, distance, elevation, difficulty }) => {
  return (
    <div className="text-white rounded-lg bg-secondary mb-4">
      <h3 className="text-2xl px-4 py-2">{title}</h3>
      <div className="grid grid-cols-3 w-full text-center">
        <div>
          <p>Distance</p>
          <p>{distance}</p>
        </div>
        <div>
          <p>Elevation</p>
          <p>{elevation}</p>
        </div>
        <div>
          <p>Difficulty</p>
          <p>{difficulty}</p>
        </div>
      </div>
      <img src={image} alt="route image" className="w-full h-64 mt-2 rounded-b-lg" />
    </div>
  )
}

export default MapPost;