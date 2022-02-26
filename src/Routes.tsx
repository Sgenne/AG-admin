import { Route, Routes as Switch } from "react-router-dom";
import EditImageCategoriesPage from "./pages/gallery/EditImageCategoriesPage";

import GalleryPage from "./pages/gallery/GalleryPage";
import NewImagePage from "./pages/gallery/NewImagePage";
import PostListPage from "./pages/blog/PostListPage";
import ScrollingImagesPage from "./pages/gallery/ScrollingImagesPage";
import SignInPage from "./pages/SignInPage";
import SingleImagePage from "./pages/gallery/SingleImagePage";
import SinglePostPage from "./pages/blog/SinglePostPage";
import NewPostPage from "./pages/blog/NewPostPage";

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
