import "../../css/images/PreviewImage.css";

interface IPreviewImageProps {
  src: string;
  onClick: () => void;
  greenBorder?: boolean;
  coverText?: string;
  alt?: string;
}

const PreviewImage = ({
  src,
  onClick,
  greenBorder,
  coverText,
  alt,
}: IPreviewImageProps) => {
  const imageClasses = `preview-image__image ${
    greenBorder ? "preview-image--green-border" : ""
  }`;

  return (
    <div className={"preview-image__container"} onClick={onClick}>
      <div className="preview-image__cover-text">{coverText}</div>
      <img className={imageClasses} src={src} alt={alt} />
    </div>
  );
};

export default PreviewImage;
