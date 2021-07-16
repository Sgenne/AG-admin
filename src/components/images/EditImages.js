import { useState, useEffect } from "react";

import styles from "./EditImages.module.css";

const EditImages = (props) => {
  const [categoryButtons, setCategoryButtons] = useState([]);

  useEffect(() => {
    const buttons = props.categories.map((category) => {
      console.log(category.categoryName);

      return (
        <button key={category.categoryName}>{category.categoryName}</button>
      );
    });

    setCategoryButtons(buttons);
  }, [props.categories]);

  return (
    <>
      <div className={styles["category-btns-container"]}>{categoryButtons}</div>
      <div></div>
    </>
  );
};

export default EditImages;
