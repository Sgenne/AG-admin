import "../../css/UI/Button.css";

interface IButtonProps {
  onClick: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  salmonHover?: boolean;
}

const Button = ({
  onClick,
  children,
  type = "button",
  disabled = false,
  salmonHover = false,
}: IButtonProps) => {
  return (
    <button
      className={`button pointer ${
        salmonHover ? "salmon-hover" : "grey-hover"
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
