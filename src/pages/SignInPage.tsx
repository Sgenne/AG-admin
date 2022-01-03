import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SignIn from "../components/signIn/SignIn";
import { signIn } from "../store/authSlice";
import { IStoreState } from "../store/store";

const SignInPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IStoreState) => state.auth, shallowEqual);

  useEffect(() => {
    if (auth.isSignedIn) return;
    dispatch(signIn({ email: "samham@test.com", password: "123456" }));
  }, [dispatch, auth.isSignedIn]);

  useEffect(() => {
    console.log("auth state: ", auth);
  }, [auth]);

  return <SignIn />;
};

export default SignInPage;
