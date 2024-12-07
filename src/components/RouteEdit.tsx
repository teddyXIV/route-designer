import icons from "../constants/logos";
import ToolTip from "./ToolTip";
import type { LatLng } from "../types/dataTypes";

interface RouteEditProps {
  removeLastCoord: () => void;
  clearCoords: () => void;
  loopIt: () => void;
  coordList: LatLng[];
}

const RouteEdit: React.FC<RouteEditProps> = ({ removeLastCoord, clearCoords, loopIt, coordList }) => {
  return (
    <div
      className="rounded-lg text-white w-fit bg-black/95 px-2 pt-1 m-2 ">
      <ToolTip tooltip="Remove last point">
        <button
          onClick={removeLastCoord}>
          <img src={icons.whiteMinusPin} />
        </button>
      </ToolTip>
      <ToolTip tooltip="Clear all points">
        <button
          onClick={clearCoords}>
          <img src={icons.whiteNoPin} />
        </button>
      </ToolTip>
      {coordList.length > 2 && coordList[0] !== coordList[coordList.length - 1] ?
        <ToolTip tooltip="Make a loop">
          <button
            onClick={loopIt}>
            <img src={icons.whitePlusPin} />
          </button>
        </ToolTip> : null}
    </div>
  )
}

export default RouteEdit;