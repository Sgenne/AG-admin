import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import LinkDropdown from "../ui/LinkDropdown";
import FirebaseContext from "../../store/firebase-context";

const BLOG_LINKS = [
  {
    to: "/blogg/nytt-inlagg",
    title: "Nytt inlägg",
  },
  {
    to: "/blogg/redigera-inlagg",
    title: "Redigera inlägg",
  },
];

const Navbar = (props) => {
  const [galleryCategories, setGalleryCategories] = useState([]);
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await firebaseContext.getCategories();

      const mappedCategories = fetchedCategories.categories.map((category) => ({
        to: `/bilder/${category["category-name"].toLowerCase()}`,
        title: category["category-name"],
      }));

      mappedCategories.push({
        to: `/bilder/framsida`,
        title: "Framsida",
      });

      setGalleryCategories(mappedCategories);
    };
    fetchCategories();
  }, [firebaseContext]);

  return (
    <div className={styles["navbar"]}>
      <div className={styles["logo-container"]}>
        <h1>
          <Link to="/">AG Foto - Admin</Link>
        </h1>
      </div>
      <div className={styles["btns-container"]}>
        <div className={styles["nav-btn"]}>
          <LinkDropdown to="#" title="Bilder" links={galleryCategories} />
        </div>
        <div className={styles["nav-btn"]}>
          <LinkDropdown to="/blogg" title="Blogg" links={BLOG_LINKS} />
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
