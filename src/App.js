import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import EditCategoryImagesPage from "./pages/gallery/EditCategoryImagesPage";
import Navbar from "./components/navbar/Navbar";
import NewBlogPostPage from "./pages/blog/NewBlogPostPage";
import EditScrollingImagesPage from "./pages/gallery/EditScrollingImagesPage";
import BlogPostListPage from "./pages/blog/BlogPostListPage";
import EditBlogPostPage from "./pages/blog/EditBlogPostPage";
import LoginPage from "./pages/login/LoginPage";
import FirebaseContext from "./store/firebase/firebase-context";

function App() {
  const firebaseContext = useContext(FirebaseContext);

  if (!firebaseContext.isAuthenticated) {
    return <LoginPage />;
  }

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
            <Redirect to="/blogg/inlagg" />
          </Route>
          <Route path="/blogg/nytt-inlagg" exact>
            <NewBlogPostPage />
          </Route>
          <Route path="/blogg/inlagg" exact>
            <BlogPostListPage />
          </Route>
          <Route path="/blogg/redigera-inlagg/:postId" exact>
            <EditBlogPostPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
