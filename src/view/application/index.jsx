import "./style.scss";

import React, { useEffect, useState } from "react";
import { BooksContainer, Search } from "../component";
import { fetchBooks } from "../../service";

const Application = () => {
  const [bookshelfContents, setBookshelfContents] = useState({
    books: [],
    count: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [savedBooks, setSavedBooks] = useState({});
  const [searchPage, setSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    books: [],
    count: 0,
  });

  const onBookshelfBookClick = (book) => {
    let newBookshelfBooks;

    delete savedBooks[book.uuid];

    newBookshelfBooks = bookshelfContents.books.filter(
      (bookshelfBook) => bookshelfBook.uuid !== book.uuid
    );

    const newBookshelfContents = {
      count: newBookshelfBooks.length,
      books: newBookshelfBooks,
    };

    setSavedBooks(savedBooks);
    setBookshelfContents(newBookshelfContents);
  };

  const onBookshelfPageChange = (page) => {
    // TODO
  };

  const onSearchClear = (query) => {
    setSearchQuery("");
    setSearchResults({
      books: [],
      count: 0,
    });
  };

  const onSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  const onSearchResultsBookClick = (book) => {
    let newBookshelfBooks;

    const isBookInLibrary = savedBooks[book.uuid];

    if (isBookInLibrary) {
      delete savedBooks[book.uuid];
      newBookshelfBooks = bookshelfContents.books.filter(
        (bookshelfBook) => bookshelfBook.uuid !== book.uuid
      );
    } else {
      savedBooks[book.uuid] = true;
      newBookshelfBooks = bookshelfContents.books.concat([book]);
    }

    const newBookshelfContents = {
      count: newBookshelfBooks.length,
      books: newBookshelfBooks,
    };

    setSavedBooks(savedBooks);
    setBookshelfContents(newBookshelfContents);
  };

  const onSearchResultsPageChange = (page) => {
    setSearchPage(page);
  };

  // Lifecycle hooks

  useEffect(() => {
    const fetchBooksService = async () => {
      setIsLoading(true);
      const result = await fetchBooks(searchQuery, searchPage);
      setIsLoading(false);
      if (result) {
        setSearchResults(result);
      }
    };
    if (searchQuery && searchQuery !== "") {
      fetchBooksService();
    }
  }, [searchPage, searchQuery]);

  return (
    <main className="library__main">
      <Search
        isLoading={isLoading}
        onClear={onSearchClear}
        onSubmit={onSearchSubmit}
      />
      <BooksContainer
        count={searchResults.count}
        books={searchResults.books}
        buttonLabel="Save to Library"
        buttonLabelSaved="Remove from Library"
        isLoading={isLoading}
        label="Search Results"
        onBookButtonClick={onSearchResultsBookClick}
        onPageChange={onSearchResultsPageChange}
        savedBooks={savedBooks}
      />
      <BooksContainer
        books={bookshelfContents.books}
        buttonLabel="Return to Library"
        isLoading={isLoading}
        label="Your Bookshelf"
        onBookButtonClick={onBookshelfBookClick}
        onPageChange={onBookshelfPageChange}
      />
    </main>
  );
};

export default Application;
