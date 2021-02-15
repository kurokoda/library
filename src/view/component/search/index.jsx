import "./style.scss";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

const Search = ({ onClear, isLoading, onSubmit }) => {
  const [query, setQuery] = useState("");

  const onChange = (event) => {
    setQuery(event.target.value);
  };

  const onInputKeyDown = (event) => {
    if (event.keyCode === 13 && query && query !== "") {
      onSubmit(query);
    }
  };

  const onSubmitLocal = () => {
    if (query) {
      onSubmit(query);
    }
  };

  const onClearLocal = () => {
    setQuery("");
    onClear();
  };

  return (
    <>
      <h2>Search For Your Books</h2>
      <div className="library__search-container">
        <InputGroup>
          <Input
            onKeyDown={onInputKeyDown}
            onChange={onChange}
            placeholder="Enter a search term"
            value={query}
          />
          <InputGroupAddon addonType="append">
            <Button disabled={isLoading} onClick={onSubmitLocal}>
              Search
            </Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button color="danger" disabled={isLoading} onClick={onClearLocal}>
              X
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  );
};

Search.defaultProps = {
  isLoading: false,
};

Search.propTypes = {
  isLoading: PropTypes.bool,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
