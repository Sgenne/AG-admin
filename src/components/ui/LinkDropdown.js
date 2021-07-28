import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./LinkDropdown.module.css";

const LinkDropdown = (props) => {
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [dropdownLinks, setDropdownLinks] = useState([]);

  const mouseOverHandler = () => {
    setDropdownExpanded(true);
  };

  const mouseOutHandler = () => {
    setDropdownExpanded(false);
  };

  useEffect(() => {
    const links = props.links.map((link) => {
      return <Link key={link.title} to={link.to}>{link.title}</Link>
    });

    setDropdownLinks(links);
  }, [props.links]);

  return (
    <div
      className={styles["container"]}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <Link to={props.to}>{props.title}</Link>
      <div
        className={`${styles["dropdown"]} ${
          dropdownExpanded ? "" : styles["dropdown-hidden"]
        }`}
      >
        {dropdownLinks}
      </div>
    </div>
  );
};

export default LinkDropdown;
