import React from "react";
import { Card, Accordion, Button, Spinner } from "react-bootstrap";
import { ReactComponent as ExpandDown } from "../img/expand-down.svg";

const InventoryItem = ({
  currentItems,
  checkOutItem,
  currentUser,
  loading,
}) => {
  return loading ? (
    <Spinner animation='border' role='status' className='load-spinner'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <Accordion>
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
              {item.description ? (
                <Card.Body>{item.description}</Card.Body>
              ) : null}
              <Card.Body>
                Location: {item.location.bin} - {item.location.shelf}
              </Card.Body>
              <Button
                className='card-btn'
                variant='outline-primary'
                onClick={() => {
                  checkOutItem(item);
                }}>
                Check Out
              </Button>
              <Button variant='outline-danger' className='card-btn'>
                Report Damage
              </Button>
            </div>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default InventoryItem;
