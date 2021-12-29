import { Route, Routes as Switch } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/bilder" element={<GalleryPage />} />
    </Switch>
  );
};

export default Routes;
