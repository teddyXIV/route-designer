import icons from "../constants/logos";

interface MapOptionsProps {
  showList: () => void;
  showDetails: () => void;
  detailsOrList: boolean;
  modalVisible: boolean;
}

const MapOptions: React.FC<MapOptionsProps> = ({ showList, showDetails, detailsOrList, modalVisible }) => {
  return (
    <div
      className="rounded-lg text-white w-fit bg-black/95 px-2 pt-1 m-2 ">
      <button className="mr-2"
        onClick={showDetails}>
        <img src={detailsOrList && modalVisible ? icons.greenMap : icons.whiteMap} />
      </button>
      <button
        onClick={showList}>
        <img src={!detailsOrList && modalVisible ? icons.greenList : icons.whiteList} />
      </button>
    </div>
  )
}

export default MapOptions;