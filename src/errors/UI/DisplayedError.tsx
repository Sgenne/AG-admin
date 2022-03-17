import "../CSS/DisplayedError.css";

interface IDisplayedErrorProps {
  errorMessage: string;
}

const DisplayedError = ({ errorMessage }: IDisplayedErrorProps) => {
  return (
    <div className="error">
      <h1 className="error__header">Uh oh... Något gick fel 😿</h1>

      <p className="error__message">{errorMessage}</p>
    </div>
  );
};

export default DisplayedError;
