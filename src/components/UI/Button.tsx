import "../../css/UI/Button.css";

interface IButtonProps {
  onClick: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ onClick, children, type = "button" }: IButtonProps) => {
  return (
    <button className="button pointer" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
