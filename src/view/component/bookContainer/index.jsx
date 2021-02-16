import "./style.scss";

import PropTypes from "prop-types";
import React from "react";

import Pagination from "../pagination";
import Book from "../book";

const BooksContainer = ({
  books,
  buttonLabel,
  buttonLabelSaved,
  count,
  isLoading,
  savedBooks,
  label,
  onBookButtonClick,
  onPageChange,
}) => {
  const hasBooks = () => {
    return count;
  };

  return (
    <div className="library__books-container">
      <h3>{label}</h3>
      {hasBooks() ? (
        <>
          <div className="library__books-container-content">
            {count && (
              <Pagination
                count={count}
                countPerPage={100}
                isLoading={isLoading}
                onPageChange={onPageChange}
              />
            )}
          </div>
          <div className="library__books-container-books">
            {books.map((book, index) => {
              const key = `library-book-${index}`;
              const isSaved = savedBooks && savedBooks[book.uuid];
              return (
                <Book
                  book={book}
                  isLoading={isLoading}
                  isSaved={isSaved}
                  key={key}
                  label={buttonLabel}
                  labelSaved={buttonLabelSaved}
                  onButtonClick={onBookButtonClick}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

BooksContainer.defaultProps = {
  books: [],
  buttonLabelSaved: null,
  count: 0,
  savedBooks: null,
};

BooksContainer.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})),
  buttonLabel: PropTypes.string.isRequired,
  buttonLabelSaved: PropTypes.string,
  count: PropTypes.number,
  isLoading: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onBookButtonClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  savedBooks: PropTypes.shape({}),
};

export default BooksContainer;
