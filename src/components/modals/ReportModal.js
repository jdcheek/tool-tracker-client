import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export default function ReportModal(props) {
  let { getInventory, selected, ...rest } = props;
  const [tool, setTool] = useState(selected);

  const handleCancel = () => {
    setTool(selected);
  };

  const handleSubmit = async () => {
    try {
      const inv = await axios.post(
        `${process.env.REACT_APP_SERVER}/inventory/update/status/${selected._id}`,
        { status: { ...selected.status, ...tool.status } },
        { withCredentials: true }
      );
      getInventory();
      return inv;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTool(selected);
  }, [selected]);

  return (
    <Modal
      {...rest}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Report Tool Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              checked={tool.status.missing || false}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: { ...tool.status, missing: !tool.status.missing },
                })
              }
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label='Text input with checkbox'
            value='Missing'
            readOnly={true}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              checked={tool.status.damaged || false}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: { ...tool.status, damaged: !tool.status.damaged },
                })
              }
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label='Text input with checkbox'
            value='Damaged'
            readOnly={true}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-primary'
          onClick={() => {
            props.onHide();
            handleSubmit();
          }}>
          Submit
        </Button>
        <Button
          variant='outline-dark'
          onClick={() => {
            props.onHide();
            handleCancel();
          }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
