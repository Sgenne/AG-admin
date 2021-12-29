import { useNavigate } from "react-router-dom";
import { FaRegImages, FaRegBookmark, FaDesktop } from "react-icons/fa";

import "../../css/sideMenu/SideMenu.css";
import SideMenuButton from "./SideMenuButton";

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <nav className="side-menu flex-column background-grey">
      <SideMenuButton
        onClick={() => navigate("/framsida")}
        icon={<FaDesktop className="side-menu-button__icon" />}
      >
        Framsida
      </SideMenuButton>
      <SideMenuButton
        onClick={() => navigate("/bilder")}
        icon={<FaRegImages className="side-menu-button__icon" />}
      >
        Bilder
      </SideMenuButton>
      <SideMenuButton
        onClick={() => navigate("/blogg")}
        icon={<FaRegBookmark className="side-menu-button__icon" />}
      >
        Blogg
      </SideMenuButton>
    </nav>
  );
};

export default SideMenu;
