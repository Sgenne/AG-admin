import "../../css/images/NewImage.css";
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
      <div className="new-image__category-select">
        <Select options={categories} onChange={onCategoryChange} />
      </div>
      <div className="new-image__file-input">
        <FileInput onFileChange={onFileChange} />
      </div>
    </div>
  );
};

export default NewImage;
