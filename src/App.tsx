import "./css/App.css";
import "./css/util.css";
import SideMenu from "./components/sideMenu/SideMenu";
import Routes from "./Routes";

function App() {
  return (
    <>
      <div className="side-menu-container">
        <SideMenu />
      </div>
      <div className="content-container">
        <Routes />
      </div>
    </>
  );
}

export default App;
