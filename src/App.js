import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import EditCategoryImagesPage from "./pages/EditCategoryImagesPage";
import Navbar from "./components/navbar/Navbar";
import NewBlogPostPage from "./pages/NewBlogPostPage";
import EditScrollingImagesPage from "./pages/EditScrollingImagesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/bilder/framsida" exact>
            <EditScrollingImagesPage />
          </Route>
          <Route path="/bilder/:category" exact>
            <EditCategoryImagesPage />
          </Route>
          <Route path="/introduktion" exact>
            <h1>Introduktion</h1>
          </Route>
          <Route path="/om-mig" exact>
            <h1>Om mig</h1>
          </Route>
          <Route path="/blogg" exact>
            <Redirect to="blogg/redigera-inlagg" />
          </Route>
          <Route path="/blogg/nytt-inlagg" exact>
            <NewBlogPostPage />
          </Route>
          <Route path="/blogg/redigera-inlagg" exact>
            <h1>Redigera inlägg</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
