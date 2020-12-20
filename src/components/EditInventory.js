import React, { useState, useEffect } from "react";
import EditInventoryCard from "./EditInventoryCard";
import Pagination from "./Pagination";

const EditInventory = ({ inventory, isLoading }) => {
  const [currentQuery, setCurrentQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState({
    query: "",
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentQuery.slice(indexOfFirstItem, indexOfLastItem);
  const pages = Math.ceil(currentQuery.length / itemsPerPage);

  useEffect(() => {
    setCurrentQuery(inventory);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentQuery(
      inventory.filter((item) => item.tool_number.includes(search.query))
    );
  }, [search, inventory]);

  const searchInventory = (e) => {
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              value={search.query}
              onChange={searchInventory}
              placeholder='Enter Tool Number'
            />
          </form>
          <EditInventoryCard
            currentItems={currentItems}
            currentQuery={currentQuery}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={currentQuery.length}
            pages={pages}
            setItemsPerPage={setItemsPerPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default EditInventory;
