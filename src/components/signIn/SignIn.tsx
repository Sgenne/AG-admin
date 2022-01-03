import { ChangeEventHandler } from "react";
import "../../css/SignIn.css";

interface ISignInProps {
  emailValue: string;
  onEmailChange: (newValue: string) => void;
  passwordValue: string;
  onPasswordChange: (newValue: string) => void;
  disableSubmit: boolean;
  onSubmit: () => void;
}

const SignIn = ({
  emailValue,
  onEmailChange,
  passwordValue,
  onPasswordChange,
  disableSubmit,
  onSubmit,
}: ISignInProps) => {
  const emailChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    onEmailChange(event.target.value);
  };

  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onPasswordChange(event.target.value);
  };

  return (
    <div className="sign-in__page">
      <div className="sign-in__inputs">
        <div className="sign-in__email">
          <input
            name="email"
            type="text"
            value={emailValue}
            onChange={emailChangeHandler}
          />
        </div>
        <div className="sign-in__password">
          <input
            name="password"
            type="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
          />
        </div>
      </div>
      <div className="sign-in__control">
        <button type="submit" disabled={disableSubmit} onClick={onSubmit}>
          Logga in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
