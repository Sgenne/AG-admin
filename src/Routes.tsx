import { Route, Routes as Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import GalleryPage from "./pages/GalleryPage";
import SignInPage from "./pages/SignInPage";
import SingleImagePage from "./pages/SingleImagePage";
import { IStoreState } from "./store/store";

const Routes = () => {
  const { isSignedIn } = useSelector((state: IStoreState) => state.auth);

  if (!isSignedIn) {
    return (
      <Switch>
        <Route path="*" element={<SignInPage />} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/logga-in" element={SignInPage} />
      <Route path="/bilder" element={<GalleryPage />} />
      <Route path="/bilder/:imageId" element={<SingleImagePage />} />
    </Switch>
  );
};

export default Routes;
