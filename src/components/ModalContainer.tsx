import icons from "../constants/logos"

interface ContainerProps {
  children: React.ReactNode;
  modalVisible: boolean;
  toggleModal: () => void;
  header: string;
}

const ModalContainer: React.FC<ContainerProps> = ({ children, modalVisible, toggleModal, header }) => {
  return (
    <div
      className={`flex flex-col 
        rounded-lg 
        h-[calc(100vh-8.5rem)] max-h-fit
      text-white w-80 bg-black/95 
        px-4 pb-2 m-2 
        transition-opacity duration-400
        ${modalVisible ? "opacity-100" : "opacity-0"}`}
    >
      <button className="ml-auto mt-2" onClick={toggleModal}>
        <img src={icons.close} alt="Close modal" />
      </button>
      <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-black scrollbar-thumb-secondary">
        <h2 className="mb-2 text-2xl font-bold">{header}</h2>
        {children}
      </div>
    </div>
  )
}

export default ModalContainer;