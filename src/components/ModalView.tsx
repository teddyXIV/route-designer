import icons from "../constants/logos";
import ToolTip from "./ToolTip";

interface ModalViewProps {
  showList: () => void;
  showDetails: () => void;
  detailsOrList: boolean;
  modalVisible: boolean;
}

const ModalView: React.FC<ModalViewProps> = ({ showList, showDetails, detailsOrList, modalVisible }) => {
  return (
    <div
      className="rounded-lg text-white w-fit bg-black/95 px-2 pt-1 m-2 ">
      <ToolTip tooltip="View route details">
        <button className="mr-2"
          onClick={showDetails}>
          <img src={detailsOrList && modalVisible ? icons.greenMap : icons.whiteMap} />
        </button>
      </ToolTip>
      <ToolTip tooltip="View saved routes">
        <button
          onClick={showList}>
          <img src={!detailsOrList && modalVisible ? icons.greenList : icons.whiteList} />
        </button>
      </ToolTip>
    </div>
  )
}

export default ModalView;