import { useEffect } from "react";

import styles from "./Login.module.css";
import useInput from "../../hooks/use-input";

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(email).toLowerCase());

  if (!isValid) {
    return [false, "Please enter a correct email address."];
  }
  return [true];
};

const Login = ({ onLogin }) => {
  const {
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    setValidityChecksHandler: setEmailValidityChecksHandler,
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useInput();

  const {
    inputHandler: passwordInputHandler,
    blurHandler: passwordBlurHandler,
    value: passwordValue,
  } = useInput();

  useEffect(() => {
    setEmailValidityChecksHandler(validateEmail);
  }, [setEmailValidityChecksHandler]);

  const loginHandler = () => {
    onLogin(emailValue, passwordValue);
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["inputs"]}>
        <label htmlFor="inputs__email-input">Email</label>
        <input
          name="inputs__email-input"
          className={styles["inputs__email-input"]}
          type="email"
          value={emailValue}
          onChange={emailInputHandler}
          onBlur={emailBlurHandler}
        />
        <label htmlFor="inputs__password-input">Lösenord</label>
        <input
          className={styles["inputs__password-input"]}
          type="password"
          value={passwordValue}
          onChange={passwordInputHandler}
          onBlur={passwordBlurHandler}
        />
      </div>
      <button onClick={loginHandler} className={styles["submit-btn"]}>
        Logga in
      </button>
    </div>
  );
};

export default Login;
