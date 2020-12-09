import React from "react";

const Pagination = ({
  setItemsPerPage,
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  pages,
}) => {
  return (
    <div>
      <button
        disabled={currentPage <= 1}
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage - 1);
        }}
        href="!#"
      >
        {"<"}
      </button>
      {currentPage} of {pages}
      <button
        disabled={currentPage === pages}
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage + 1);
        }}
        href="!#"
      >
        {">"}
      </button>
      <label htmlFor="selection">Results Per Page</label>
      <select
        name="items-per-page"
        onChange={(e) => setItemsPerPage(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default Pagination;
