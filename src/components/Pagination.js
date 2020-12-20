import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({
  setItemsPerPage,
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  pages,
}) => {
  return (
    <div className='footer'>
      <Button
        variant='outline-dark'
        disabled={currentPage <= 1}
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage - 1);
        }}
        href='!#'>
        {"<"}
      </Button>
      <span>
        {currentPage} of {pages}
      </span>
      <Button
        variant='outline-dark'
        disabled={currentPage === pages}
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage + 1);
        }}
        href='!#'>
        {">"}
      </Button>
      <label htmlFor='selection'>Results Per Page</label>
      <select
        defaultValue='10'
        name='items-per-page'
        onChange={(e) => setItemsPerPage(e.target.value)}>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
      </select>
    </div>
  );
};

export default Pagination;
