import { useDispatch } from "react-redux";

import SignIn from "../components/signIn/SignIn";
import { signIn } from "../store/authSlice";
import useInput from "../hooks/useInput";
import { useState } from "react";

const SignInPage = () => {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const { value: emailValue, onChange: onEmailChange } = useInput();
  const { value: passwordValue, onChange: onPasswordChange } = useInput();

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (!(emailValue && passwordValue)) {
      setMessage("Vänligen ange email och lösenord.");
      setHasError(true);
      return;
    }

    dispatch(signIn({ email: emailValue, password: passwordValue }));
  };

  return (
    <SignIn
      emailValue={emailValue || ""}
      onEmailChange={onEmailChange}
      passwordValue={passwordValue || ""}
      onPasswordChange={onPasswordChange}
      onSubmit={submitHandler}
      hasError={hasError}
      message={message}
    />
  );
};

export default SignInPage;
