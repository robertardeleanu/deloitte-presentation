import type { JSX } from "react";

import "./styles.scss";

type Props = {
  heading: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * @name Container
 * @description A container component for the application to render the heading, actions, and children.
 * @param {string} heading - The heading of the container.
 * @param {React.ReactNode} actions - The actions of the container.
 * @param {React.ReactNode} children - The children of the container.
 * @returns {JSX.Element}
 */
const Container = ({ heading, actions, children }: Props): JSX.Element => {
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
