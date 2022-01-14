import "../../css/UI/MessagePopup.css";

interface IMessagePopupProps {
  message: string;
  error?: boolean;
  success?: boolean;
}

const MessagePopup = ({ message, error, success }: IMessagePopupProps) => {
  if (!message) return <></>;

  const messageClassName = `message-popup ${
    error ? "message-popup--error" : success ? "message-popup--success" : ""
  }`;

  return <div className={messageClassName}>{message}</div>;
};

export default MessagePopup;
