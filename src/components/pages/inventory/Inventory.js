import React, { useState, useEffect, useRef, useContext } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import LoadingSpinner from "../../lib/LoadingSpinner";
import axios from "axios";
import InventoryCard from "./InventoryCard";
import Pagination from "../../lib/Pagination";

export default function Inventory({ getAccountInfo }) {
  const mountedRef = useRef(true);
  const { currentUser } = useContext(UserContext);
  const [inventory, setInventory] = useState([]);
  const [currentQuery, setCurrentQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState({
    query: "",
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = currentQuery.slice(indexOfFirstItem, indexOfLastItem);
  const pages = Math.ceil(currentQuery.length / itemsPerPage);

  useEffect(() => {
    getInventory();
    return () => (mountedRef.current = false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentQuery(
      inventory.filter((item) => item.tool_number.includes(search.query))
    );
    // eslint-disable-next-line
  }, [search]);

  const getInventory = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/inventory`, {
        withCredentials: true,
      });
      if (mountedRef.current) {
        setInventory(res.data);
        // Conditional to keep search active while inventory updates
        if (currentQuery.length >= 1 && currentQuery.length < res.data.length) {
          setCurrentQuery(
            res.data.filter((item) => item.tool_number.includes(search.query))
          );
        } else {
          setCurrentQuery(res.data);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkOutItem = async (tool) => {
    try {
      // eslint-disable-next-line
      const inv = await axios.post(
        `${process.env.REACT_APP_SERVER}/inventory/update/status/${tool._id}`,
        {
          status: {
            checked_out: true,
            username: currentUser.username,
            date: new Date(),
          },
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    try {
      // eslint-disable-next-line
      const usr = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/tools`,
        {
          id: tool._id,
          tool_number: tool.tool_number,
          location: tool.location,
          user: currentUser.username,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    getAccountInfo();
  };

  const searchInventory = (e) => {
    setLoading(true);
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });
    setCurrentPage(1);
    setLoading(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className='inventory-wrapper'>
      <InputGroup className='mb-3'>
        <FormControl
          type='text'
          value={search.query}
          placeholder='Search by tool number...'
          onChange={searchInventory}
        />
      </InputGroup>
      <>
        <InventoryCard
          getInventory={getInventory}
          currentUser={currentUser}
          currentItems={currentItems}
          currentQuery={currentQuery}
          checkOutItem={checkOutItem}
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
    </div>
  );
}
