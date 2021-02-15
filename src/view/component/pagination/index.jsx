import "./style.scss";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Pagination as ReactStrapPagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const Pagination = ({ count, countPerPage, isLoading, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / countPerPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <ReactStrapPagination size="sm" aria-label="Page navigation example">
      <PaginationItem disabled={isLoading || currentPage === 1}>
        <PaginationLink
          onClick={() => {
            setCurrentPage(1);
          }}
          first
        />
      </PaginationItem>
      <PaginationItem disabled={isLoading || currentPage === 1}>
        <PaginationLink
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          previous
        />
      </PaginationItem>
      <PaginationItem>
        <div className="library__pagination-label">
          Page {currentPage} of {totalPages}
        </div>
      </PaginationItem>
      <PaginationItem disabled={isLoading || currentPage === totalPages}>
        <PaginationLink
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          next
        />
      </PaginationItem>
      <PaginationItem disabled={isLoading || currentPage === totalPages}>
        <PaginationLink
          onClick={() => {
            setCurrentPage(totalPages);
          }}
          last
        />
      </PaginationItem>
    </ReactStrapPagination>
  );
};

Pagination.defaultProps = {
  isLoading: false,
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
