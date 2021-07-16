import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={styles["navbar"]}>
      <div className={styles["logo-container"]}>
        <h1><Link to="/">AG Foto - Admin</Link></h1>
      </div>
      <div className={styles["btns-container"]}>
        <div className={styles["nav-btn"]}>
          <Link to="/bilder">Bilder</Link>
        </div>
        <div className={styles["nav-btn"]}>
          <Link to="/blogg">Blogginlägg</Link>
        </div>
        <div className={styles["nav-btn"]}>
          <Link to="/introduktion">Introduktion</Link>
        </div>
        <div className={styles["nav-btn"]}>
          <Link to="om-mig">Om mig</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
