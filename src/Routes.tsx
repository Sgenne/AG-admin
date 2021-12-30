import { Route, Routes as Switch } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import SingleImagePage from "./pages/SingleImagePage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/bilder" element={<GalleryPage />} />
      <Route path="/bilder/:imageId" element={<SingleImagePage />} />
    </Switch>
  );
};

export default Routes;
