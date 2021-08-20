import { useContext } from "react";

import Login from "../../components/login/Login";
import FirebaseContext from "../../store/firebase/firebase-context";

const LoginPage = () => {
  const firebaseContext = useContext(FirebaseContext);

  const loginHandler = (email, password) => {
    firebaseContext.signIn(email, password).then(err => {
      if (err) {
        console.log("Invalid email or password")
      } else {
        console.log("Succesfully logged in!")
      }
    })
  }

  return <Login onLogin={loginHandler} />;
};

export default LoginPage;
