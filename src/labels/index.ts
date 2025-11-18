const LABELS_RAW = {
  ADD_NEW_BOOK_EXPLANATION: "Add a new book to the bookshelf",
  BOOK_COVER_FOR: "Book cover for",
  BOOKSHELF: "Bookshelf",
  NEW_BOOK: "New Book",
  SHOW_LESS: "Show Less",
  SHOW_MORE: "Show More",
};

const LABELS = new Proxy(LABELS_RAW, {
  get(target, prop) {
    if (prop in target) {
      return target[prop as keyof typeof target];
    }
    console.error(`Label key "${String(prop)}" has not been implemented yet`);
    return undefined;
  },
});

export default LABELS;
