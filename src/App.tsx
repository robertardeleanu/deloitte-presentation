import { useState, type JSX } from "react";

import Container from "./components/container";
import Tile from "./components/tile";

import LABELS from "./labels";

import { BOOKSHELF_MOCKUP, type Book } from "./mockups/bookshelf";

import "./App.scss";

/**
 * @name App
 * @description The main application component.
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
  const [books, setBooks] = useState<Book[]>(BOOKSHELF_MOCKUP);

  const bookTiles = books.map((book) => (
    <Tile
      key={book.id}
      title={book.title}
      description={book.description}
      imageUrl={book.imageUrl}
    />
  ));

  const handleOnNewBookClick = () => {
    setBooks([
      ...books,
      {
        id: books.length + 1,
        title: "New Book",
        description: "New Book Description",
      },
    ]);
  };

  const newBookButton = (
    <button
      onClick={handleOnNewBookClick}
      aria-label={LABELS.ADD_NEW_BOOK_EXPLANATION}
    >
      {LABELS.NEW_BOOK}
    </button>
  );

  return (
    <div className="app">
      <Container heading={LABELS.BOOKSHELF} actions={[newBookButton]}>
        {bookTiles}
      </Container>
    </div>
  );
}

export default App;
