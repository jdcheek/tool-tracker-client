import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, InputGroup, FormControl, Form } from "react-bootstrap";

export default function EditInventoryModal(props) {
  const { getInventory, selected, ...rest } = props;
  const [tool, setTool] = useState(selected);

  const handleCancel = () => {
    setTool(selected);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/inventory/update/${tool._id}`,
        tool,
        { withCredentials: true }
      );
      getInventory();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/inventory/${tool._id}`,
        { withCredentials: true }
      );
      getInventory();
      return res;
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
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header
        closeButton
        onClick={() => {
          handleCancel();
        }}>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Tool Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "125px" }}>Tool</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='text'
            value={tool.tool_number}
            onChange={(e) =>
              setTool({ ...tool, tool_number: e.target.value.toUpperCase() })
            }
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "125px" }}>
              Location
            </InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Prepend>
            <InputGroup.Text>Shelf</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='text'
            value={tool.location.shelf}
            onChange={(e) =>
              setTool({
                ...tool,
                location: {
                  ...tool.location,
                  shelf: e.target.value.toUpperCase(),
                },
              })
            }
          />
          <InputGroup.Prepend>
            <InputGroup.Text>Bin</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='text'
            value={tool.location.bin}
            onChange={(e) =>
              setTool({
                ...tool,
                location: {
                  ...tool.location,
                  bin: e.target.value.toUpperCase(),
                },
              })
            }
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "125px" }}>
              Description
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as='textarea'
            value={tool.description || ""}
            onChange={(e) => setTool({ ...tool, description: e.target.value })}
          />
        </InputGroup>

        <Form>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='Checked out'
              checked={tool.status.checked_out}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: {
                    ...tool.status,
                    checked_out: !tool.status.checked_out,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='Missing'
              checked={tool.status.missing || false}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: { ...tool.status, missing: !tool.status.missing },
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='Damaged'
              checked={tool.status.damaged || false}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: { ...tool.status, damaged: !tool.status.damaged },
                })
              }
            />
          </Form.Group>
        </Form>
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
          variant='outline-danger'
          onClick={() => {
            props.onHide();
            handleDelete();
          }}>
          Delete
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
