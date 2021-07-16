import { useParams } from "react-router";

import EditCategoryImages from "../components/images/EditCategoryImages";

const DUMMY_IMAGES = [
  {
    title: "tmp title",
    imageUrl: "https://i.redd.it/hdsr83j38gb71.jpg",
  },
  {
    title: "tmp title",
    imageUrl: "https://i.redd.it/hdsr83j38gb71.jpg",
  },
  {
    title: "tmp title",
    imageUrl: "https://i.redd.it/hdsr83j38gb71.jpg",
  },
  {
    title: "tmp title",
    imageUrl: "https://i.redd.it/hdsr83j38gb71.jpg",
  },
  {
    title: "tmp title",
    imageUrl: "https://i.redd.it/hdsr83j38gb71.jpg",
  },
  {
    title: "tmp title",
    imageUrl: "https://i.redd.it/hdsr83j38gb71.jpg",
  },
];

const EditCategoryImagesPage = () => {
  const { category } = useParams();

  return (
    <>
      <h1>{category}</h1>
      <EditCategoryImages images={DUMMY_IMAGES} />
    </>
  );
};

export default EditCategoryImagesPage;
