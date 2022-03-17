import "../CSS/SideMenuButton.css";

interface SideMenuButtonProps {
  children: string;
  onClick: () => void;
  icon: JSX.Element | null;
}

const SideMenuButton = ({ children, onClick, icon }: SideMenuButtonProps) => {
  const buttonIcon = icon ? icon : <></>;

  return (
    <button
      onClick={onClick}
      className="side-menu-button flex-column ai-center jc-center pointer"
    >
      {buttonIcon}
      {children}
    </button>
  );
};

export default SideMenuButton;
