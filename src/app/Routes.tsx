import { Route, Routes as Switch } from "react-router-dom";
import EditImageCategoriesPage from "../images/pages/EditImageCategoriesPage";

import GalleryPage from "../images/pages/GalleryPage";
import NewImagePage from "../images/pages/NewImagePage";
import PostListPage from "../blog/pages/PostListPage";
import ScrollingImagesPage from "../images/pages/ScrollingImagesPage";
import SignInPage from "../sign-in/pages/SignInPage";
import SingleImagePage from "../images/pages/SingleImagePage";
import SinglePostPage from "../blog/pages/SinglePostPage";
import NewPostPage from "../blog/pages/NewPostPage";

export const SignInRoute = () => (
  <Switch>
    <Route path="*" element={<SignInPage />} />
  </Switch>
);

const Routes = () => {
  return (
    <Switch>
      <Route path="/framsida" element={<ScrollingImagesPage />} />
      <Route path="/bilder" element={<GalleryPage />} />
      <Route path="/bilder/:imageId" element={<SingleImagePage />} />
      <Route path="/ny-bild" element={<NewImagePage />} />
      <Route
        path="/bilder/redigera-kategorier"
        element={<EditImageCategoriesPage />}
      />

      <Route path="/blogg" element={<PostListPage />} />
      <Route path="/blogg/:postId" element={<SinglePostPage />} />
      <Route path="/blogg/nytt-inlagg" element={<NewPostPage />} />
    </Switch>
  );
};

export default Routes;
