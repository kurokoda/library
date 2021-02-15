import "./style.scss";

import PropTypes from "prop-types";
import React from "react";
import { Button } from "reactstrap";

import { trimString } from "../../../service";

const Book = ({
  book,
  isLoading,
  isSaved,
  label,
  labelSaved,
  onButtonClick,
}) => {
  const author =
    book.author_name && book.author_name.length
      ? book.author_name[0]
      : book.author_name
      ? book.author_name
      : "";

  const title = book.title || "";

  let formattedAuthor = trimString(author);
  let formattedTitle = trimString(title);

  const onButtonClickLocal = () => {
    onButtonClick(book);
  };

  return (
    <div className="library__book">
      <h6>{formattedTitle}</h6>
      <p>{formattedAuthor}</p>
      <Button disabled={isLoading} onClick={onButtonClickLocal}>
        {isSaved ? labelSaved : label}
      </Button>
    </div>
  );
};

Book.defaultProps = {
  isLoading: false,
  isSaved: false,
  labelSaved: null,
};

Book.propTypes = {
  book: PropTypes.shape({
    author_name: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
  isSaved: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelSaved: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default Book;
