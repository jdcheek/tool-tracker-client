import React from "react";

const InventoryItem = ({
  currentItems,
  checkOutItem,
  currentUser,
  loading,
}) => {
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      {currentItems.map((item) => (
        <div key={item._id}>
          <p>Tool Number: {item.tool_number}</p>
          <p>
            Location: {item.location.shelf} - {item.location.bin}
          </p>

          {currentUser.isLoggedIn ? (
            item.status.checked_out ? (
              <button disabled>Checked out by {item.status.username}</button>
            ) : (
              <button
                onClick={() => {
                  checkOutItem(item);
                }}>
                Check Out
              </button>
            )
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventoryItem;
