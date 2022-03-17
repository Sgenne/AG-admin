import "../CSS/NewImage.css";
import Button from "../../common/UI/Button";
import FileInput from "../../common/UI/FileInput";
import MessagePopup from "../../common/UI/MessagePopup";
import Select from "../../common/UI/Select";

interface NewImageProps {
  categories: string[];
  onCategoryChange: (newValue: string) => void;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
  disableSubmit: boolean;
  hasError: boolean;
  message: string;
}

const NewImage = ({
  categories,
  onCategoryChange,
  onFileChange,
  onSubmit,
  disableSubmit,
  hasError,
  message,
}: NewImageProps) => {
  const categoryOptions = categories.map((category) => ({
    text: category,
    value: category,
  }));

  return (
    <div className="new-image__page">
      <MessagePopup message={message} error={hasError} />
      <div className="new-image__options">
        <FileInput onFileChange={onFileChange}>Välj bild</FileInput>
        <span className="new-image__select">
          <Select
            label="Välj kategori"
            options={categoryOptions}
            onChange={onCategoryChange}
          />
        </span>

        <Button onClick={onSubmit} disabled={disableSubmit}>
          Lägg till bild
        </Button>
      </div>
    </div>
  );
};

export default NewImage;
