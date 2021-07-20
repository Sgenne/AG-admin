import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../store/firebase-context";

import EditGallery from "../components/images/EditGallery";

const EditImagesPage = () => {
  const [categories, setCategories] = useState([]);

  const firebaseContext = useContext(FirebaseContext);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await firebaseContext.getCategories();
      console.log("fetched categories: ", fetchedCategories);
      setCategories(fetchedCategories.categories);
    }
    fetchCategories();
  }, [firebaseContext])

  return <EditGallery categories={categories} />;
};

export default EditImagesPage;
