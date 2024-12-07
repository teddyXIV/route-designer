import { useRef } from "react";

interface ToolTipProps {
  children: React.ReactNode;
  tooltip: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ children, tooltip }) => {
  const toolTipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      className="group relative inline-block"
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!toolTipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        toolTipRef.current.style.left = clientX - left + "px";
      }}>
      {children}
      <span
        ref={toolTipRef}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-secondary text-white rounded-lg p-1 absolute top-full mt-1 whitespace-nowrap">
        {tooltip}
      </span>
    </div>
  )
}

export default ToolTip;