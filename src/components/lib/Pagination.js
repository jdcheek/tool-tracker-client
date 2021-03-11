import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ paginate, currentPage, pages }) => {
  return (
    <div className='footer'>
      <Pagination>
        <Pagination.First
          onClick={(e) => {
            e.preventDefault();
            paginate(1);
          }}
        />
        <Pagination.Prev
          disabled={currentPage <= 1}
          onClick={(e) => {
            e.preventDefault();
            paginate(currentPage - 1);
          }}
        />
        <Pagination.Item active>
          {currentPage} of {pages || 1}
        </Pagination.Item>
        <Pagination.Next
          disabled={currentPage === pages}
          onClick={() => {
            paginate(currentPage + 1);
          }}
        />
        <Pagination.Last
          disabled={currentPage === pages}
          onClick={() => {
            paginate(pages);
          }}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
