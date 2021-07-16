import EditGallery from "../components/images/EditGallery";

const DUMMY_CATEGORIES = [
  {
    categoryName: "Macro",
  },
  {
    categoryName: "Människor",
  },
  {
    categoryName: "Djur",
  },
  {
    categoryName: "Landskap",
  },
  {
    categoryName: "Arkitektur",
  },
];

const EditImagesPage = () => {
  return <EditGallery categories={DUMMY_CATEGORIES} />;
};

export default EditImagesPage;
