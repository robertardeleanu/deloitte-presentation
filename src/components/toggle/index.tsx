import "./styles.scss";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

const Toggle = ({ isOpen, onClick }: Props) => {
  const ariaLabel = isOpen ? "Show Less" : "Show More";
  const upArrow = <p>&#8593;</p>;
  const downArrow = <p>&#8595;</p>;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      onClick={onClick}
      className="toggle-button"
      title={ariaLabel}
    >
      <div className="toggle-button-content">
        <span aria-hidden="true">{isOpen ? upArrow : downArrow}</span>
        <span className="sr-only">{isOpen ? "Show Less" : "Show More"}</span>
      </div>
    </button>
  );
};

export default Toggle;
