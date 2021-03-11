import React, { useState } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { ReactComponent as ExpandDown } from "../../../img/expand-down.svg";
import EditInventoryModal from "../../modals/EditInventoryModal";
import ReportModal from "../../modals/ReportModal";

const InventoryCard = ({
  currentItems,
  checkOutItem,
  currentUser,
  getInventory,
}) => {
  const defaultItem = {
    tool_number: "",
    description: "",
    location: {
      shelf: "",
      bin: "",
    },
    status: {
      checked_out: false,
      username: null,
      date: new Date(),
      missing: false,
      damaged: false,
    },
  };
  const [inventoryModalShow, setInventoryModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [selected, setSelected] = useState(defaultItem);

  return (
    <Accordion className='result-accordion'>
      <EditInventoryModal
        getInventory={getInventory}
        selected={selected}
        show={inventoryModalShow}
        onHide={() => setInventoryModalShow(false)}
      />
      <ReportModal
        getInventory={getInventory}
        selected={selected}
        show={reportModalShow}
        onHide={() => setReportModalShow(false)}
      />
      {currentItems.map((item) => (
        <Card key={item._id}>
          <Card.Header className='result-header'>
            {item.tool_number}
            <Accordion.Toggle as={Button} variant='text' eventKey={item._id}>
              <ExpandDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={item._id}>
            <div className='more-info'>
              <Card.Body className='inventory-card-body'>
                Location: {item.location.shelf} - {item.location.bin}
                {item.description && <span>{item.description}</span>}
                <span className='checked-out-msg'>
                  {item.status.checked_out &&
                    `Checked out to ${item.status.username} on ${item.status.date}`}
                </span>
              </Card.Body>
              <div className='card-action-container'>
                <Button
                  disabled={item.status.checked_out}
                  className='card-btn'
                  variant='outline-primary'
                  onClick={() => {
                    checkOutItem(item);
                  }}>
                  Check Out
                </Button>
                <Button
                  variant='outline-danger'
                  className='card-btn'
                  onClick={() => {
                    setSelected(item);
                    setReportModalShow(true);
                  }}>
                  Report
                </Button>
                {currentUser.isAdmin && (
                  <Button
                    className='card-btn'
                    variant='outline-info'
                    onClick={() => {
                      setSelected(item);
                      setInventoryModalShow(true);
                    }}>
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default InventoryCard;
