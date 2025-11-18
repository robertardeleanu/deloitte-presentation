import { useState, type JSX } from "react";

import Toggle from "../toggle";

import LABELS from "../../labels";

import "./styles.scss";

type Props = {
  title: string;
  description: string;
  imageUrl?: string;
};

const PLACEHOLDER_IMAGE_URL = "https://placehold.co/400";

/**
 * @name Tile
 * @description A tile component for the application to render the title, description, and image.
 * @param title - The title of the tile.
 * @param description - The description of the tile.
 * @param imageUrl - optional - The image url of the tile.
 * @returns {JSX.Element}
 */
const Tile = ({ title, description, imageUrl }: Props): JSX.Element => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    imageUrl || PLACEHOLDER_IMAGE_URL
  );
  const [isDescriptionVisible, setIsDescriptionVisible] =
    useState<boolean>(true);

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
        <img
          src={imgSrc}
          alt={`${LABELS.BOOK_COVER_FOR} ${title}`}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default Tile;
