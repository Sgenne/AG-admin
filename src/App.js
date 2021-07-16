import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditCategoryImagesPage from "./pages/EditCategoryImagesPage";

import Navbar from "./components/navbar/Navbar";
import EditGalleryPage from "./pages/EditGalleryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/bilder" exact>
            <EditGalleryPage />
          </Route>
          <Route path="/bilder/:category" exact>
            <EditCategoryImagesPage />
          </Route>
          <Route path="/blogg" exact>
            <h1>Blogg</h1>
          </Route>
          <Route path="/introduktion" exact>
            <h1>Introduktion</h1>
          </Route>
          <Route path="/om-mig" exact>
            <h1>Om mig</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
