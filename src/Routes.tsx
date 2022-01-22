import { Route, Routes as Switch } from "react-router-dom";
import EditImageCategoriesPage from "./pages/EditImageCategoriesPage";

import GalleryPage from "./pages/GalleryPage";
import NewImagePage from "./pages/NewImagePage";
import PostListPage from "./pages/PostListPage";
import ScrollingImagesPage from "./pages/ScrollingImagesPage";
import SignInPage from "./pages/SignInPage";
import SingleImagePage from "./pages/SingleImagePage";

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
    </Switch>
  );
};

export default Routes;
