import { Route, Routes as Switch } from "react-router-dom";

import GalleryPage from "./pages/GalleryPage";
import NewImagePage from "./pages/NewImagePage";
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
      <Route path="/bilder" element={<GalleryPage />} />
      <Route path="/bilder/:imageId" element={<SingleImagePage />} />
      <Route path="/ny-bild" element={<NewImagePage />} />
    </Switch>
  );
};

export default Routes;
