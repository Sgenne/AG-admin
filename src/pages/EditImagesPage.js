import EditImages from "../components/images/EditImages";

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
  return <EditImages categories={DUMMY_CATEGORIES} />;
};

export default EditImagesPage;
