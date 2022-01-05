import { KeyboardEvent } from "react";
import "../../css/SignIn.css";
import Button from "../UI/Button";
import Input from "../UI/Input";

interface ISignInProps {
  emailValue: string;
  onEmailChange: (newValue: string) => void;
  passwordValue: string;
  onPasswordChange: (newValue: string) => void;
  onSubmit: () => void;
  message: string;
  hasError: boolean;
}

const SignIn = ({
  emailValue,
  onEmailChange,
  passwordValue,
  onPasswordChange,
  onSubmit,
  message,
  hasError,
}: ISignInProps) => {
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter") onSubmit();
  };

  return (
    <div className="sign-in__page">
      {message && <div className="sign-in__message">{message}</div>}
      <div className="sign-in__inputs flex-column ai-center">
        <div className="sign-in__email">
          <label htmlFor="email">Email: </label>
          <Input
            id="email"
            name="email"
            type="text"
            value={emailValue}
            onChange={onEmailChange}
            error={hasError}
            onKeyDown={keyDownHandler}
          />
        </div>
        <div className="sign-in__password">
          <label htmlFor="password">Lösenord: </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={passwordValue}
            onChange={onPasswordChange}
            error={hasError}
            onKeyDown={keyDownHandler}
          />
        </div>
      </div>
      <div className="sign-in__control flex-row jc-center">
        <Button type="submit" onClick={onSubmit}>
          Logga in
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
