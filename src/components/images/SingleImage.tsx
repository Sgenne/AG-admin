import { IImage } from "../../interfaces/image";

interface ISingleImage {
  image: IImage | undefined;
}

const SingleImage = ({ image }: ISingleImage) => {
  return (
    <div className="single-image__page">
      <div className="single-image__image-container">
        {image && (
          <img className="single-image__image" src={image.imageUrl} alt="" />
        )}
      </div>
      <div className="single-image__control"></div>
    </div>
  );
};

export default SingleImage;
