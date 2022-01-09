import "../../css/UI/MessagePopup.css";

interface IMessagePopupProps {
  message: string;
  error: boolean;
}

const MessagePopup = ({ message, error }: IMessagePopupProps) => {
  if (!message) return <></>;

  const messageClassName = `message-popup ${
    error ? "message-popup--error" : ""
  }`;

  return <div className={messageClassName}>{message}</div>;
};

export default MessagePopup;
