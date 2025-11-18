import type { JSX } from "react";

import LABELS from "../../labels";
import "./styles.scss";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

/**
 * @name Toggle
 * @description A toggle component for the application to render a button with 2 arrows to show and hide content.
 * @param isOpen - The state of the toggle.
 * @param onClick - The function to call when the toggle is clicked.
 * @returns {JSX.Element}
 */
const Toggle = ({ isOpen, onClick }: Props): JSX.Element => {
  const titleText = isOpen ? LABELS.SHOW_LESS : LABELS.SHOW_MORE;
  /** Use unicode for the arrows */
  const upArrow = <p>&#8593;</p>;
  const downArrow = <p>&#8595;</p>;

  return (
    <button
      type="button"
      aria-label={titleText}
      aria-expanded={isOpen}
      onClick={onClick}
      className="toggle-button"
      title={titleText}
    >
      <div className="toggle-button-content">
        <span aria-hidden="true">{isOpen ? upArrow : downArrow}</span>
        <span className="sr-only">{titleText}</span>
      </div>
    </button>
  );
};

export default Toggle;
