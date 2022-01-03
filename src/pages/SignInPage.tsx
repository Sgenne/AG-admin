import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import SignIn from "../components/signIn/SignIn";
import { signIn } from "../store/authSlice";
import { IStoreState } from "../store/store";
import useInput from "../hooks/useInput";

const SignInPage = () => {
  const { value: emailValue, onChange: onEmailChange } = useInput();

  const { value: passwordValue, onChange: onPasswordChange } = useInput();

  const dispatch = useDispatch();
  const auth = useSelector((state: IStoreState) => state.auth, shallowEqual);

  useEffect(() => {
    console.log("auth state: ", auth);
  }, [auth]);

  const submitHandler = () => {
    if (!(emailValue && passwordValue)) return;

    dispatch(signIn({ email: emailValue, password: passwordValue }));
  };

  const disableSubmit = !(emailValue && passwordValue);

  return (
    <SignIn
      emailValue={emailValue || ""}
      onEmailChange={onEmailChange}
      passwordValue={passwordValue || ""}
      onPasswordChange={onPasswordChange}
      disableSubmit={disableSubmit}
      onSubmit={submitHandler}
    />
  );
};

export default SignInPage;
