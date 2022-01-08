import "../../css/images/NewImage.css";
import Button from "../UI/Button";
import FileInput from "../UI/FileInput";
import Select from "../UI/Select";

interface NewImageProps {
  categories: string[];
  onCategoryChange: (newValue: string) => void;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
}

const NewImage = ({
  categories,
  onCategoryChange,
  onFileChange,
  onSubmit,
}: NewImageProps) => {
  return (
    <div className="new-image__page">
      <div className="new-image__options">
        <FileInput onFileChange={onFileChange}>Välj bild</FileInput>
        <Select
          label="Välj kategori"
          options={categories}
          onChange={onCategoryChange}
        />
        <Button onClick={onSubmit}>Lägg till bild</Button>
      </div>
    </div>
  );
};

export default NewImage;