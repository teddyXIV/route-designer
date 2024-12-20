import ModalContainer from "./ModalContainer";

interface MenuProps {
  visible: boolean;
  toggleMenu: () => void;
  header: string
}

const Menu: React.FC<MenuProps> = ({ visible, toggleMenu, header }) => {
  return (
    <ModalContainer modalVisible={visible} toggleModal={toggleMenu} header={header}>
      <div></div>
    </ModalContainer>

  )
}

export default Menu;