import "./App.css";
import "../utils/util.css";
import SideMenu from "../side-menu/UI/SideMenu";
import Routes, { SignInRoute } from "./Routes";
import { StoreState } from "../store/store";
import { useSelector } from "react-redux";
import ErrorBoundary from "../errors/ErrorBoundary";

function App() {
  const isSignedIn = useSelector((state: StoreState) => state.auth.isSignedIn);

  console.log(isSignedIn);

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
