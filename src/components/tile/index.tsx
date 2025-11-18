import { useState } from "react";

import Toggle from "../toggle";

import "./styles.scss";

type Props = {
  title: string;
  description: string;
  imageUrl?: string;
};

const PLACEHOLDER_IMAGE_URL = "https://placehold.co/400";

const Tile = ({ title, description, imageUrl }: Props) => {

  const [imgSrc, setImgSrc] = useState<string | undefined>(imageUrl || PLACEHOLDER_IMAGE_URL);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState<boolean>(true);

  const handleImageError = () => {
    setImgSrc(PLACEHOLDER_IMAGE_URL);
  };

  return (
    <div className="tile">
      <div className="tile-content">
        <div className="tile-title">
          <h2 title={title}>{title}</h2>
          <Toggle
            isOpen={isDescriptionVisible}
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
          />
        </div>
        <div
          className={`tile-description ${
            isDescriptionVisible ? "visible" : "hidden"
          }`}
          aria-hidden={!isDescriptionVisible}
        >
          <p>{description}</p>
        </div>
      </div>
      <div className="tile-image">
        <img src={imgSrc} alt={`Book cover for ${title}`}  onError={handleImageError} />
      </div>
    </div>
  );
};

export default Tile;
