import { useState } from "react";

import TrashIcon from "../../icons/TrashIcon";
import styles from "./ImageItemButton.module.css";

const ImageItemButton = (props) => {
  const [hovering, setHovering] = useState(false);

  const mouseEnterHandler = () => {
    setHovering(true);
  };

  const mouseLeaveHandler = () => {
    setHovering(false);
  };

  return (
    <button
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={styles["btn"]}
      onClick={props.onClick}
    >
      <TrashIcon className={styles["icon"]} hover={hovering} />
    </button>
  );
};

export default ImageItemButton;
