import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

import styles from "./EditGallery.module.css";

const EditImages = (props) => {
  const [categoryButtons, setCategoryButtons] = useState([]);
  const history = useHistory(); 

  useEffect(() => {
    const buttons = props.categories.map((category) => {

      const clickHandler = () => {
        history.push(`/bilder/${category.categoryName}`)
      }

      return (
        <button key={category.categoryName} onClick={clickHandler} >{category.categoryName}</button>
      );
    });

    setCategoryButtons(buttons);
  }, [props.categories, history]);

  return (
    <>
      <div className={styles["category-btns-container"]}>{categoryButtons}</div>
      <div></div>
    </>
  );
};

export default EditImages;
