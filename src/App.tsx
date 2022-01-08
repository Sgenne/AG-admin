import "./css/App.css";
import "./css/util.css";
import SideMenu from "./components/sideMenu/SideMenu";
import Routes, { SignInRoute } from "./Routes";
import { IStoreState } from "./store/store";
import { useSelector } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const isSignedIn = useSelector((state: IStoreState) => state.auth.isSignedIn);

  if (!isSignedIn) {
    return (
      <ErrorBoundary>
        <SignInRoute />
      </ErrorBoundary>
    );
  }

  return (
    <>
      <div className="side-menu-container">
        <SideMenu />
      </div>
      <div className="content-container">
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
