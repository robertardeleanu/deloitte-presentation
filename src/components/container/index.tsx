import "./styles.scss";

type Props = {
  heading: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const Container = ({ heading, actions, children }: Props) => {
  return (
    <div className="container">
      <header className="container-heading">
        <h1>{heading}</h1>
        {actions && <div className="container-actions">{actions}</div>}
      </header>
      <main className="container-content">{children}</main>
    </div>
  );
};

export default Container;
