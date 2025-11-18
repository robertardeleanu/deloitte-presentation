import { useState } from "react";

import Container from "./components/container";
import Tile from "./components/tile";

import { type Book, BOOKSHELF_MOCKUP } from "./mockups/bookshelf";

import "./App.scss";

function App() {
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
      aria-label="Add a new book to the bookshelf"
    >
      New Book
    </button>
  );

  return (
    <div className="app">
      <Container heading="Bookshelf" actions={[newBookButton]}>
        {bookTiles}
      </Container>
    </div>
  );
}

export default App;
