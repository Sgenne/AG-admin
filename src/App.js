import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import EditImagesPage from "./pages/EditImagesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/bilder" exact>
            <EditImagesPage />
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
