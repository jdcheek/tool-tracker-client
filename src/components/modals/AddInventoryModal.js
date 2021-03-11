import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Alert,
} from "react-bootstrap";

export default function AddInventoryModal(props) {
  const { ...rest } = props;
  const initialToolObj = {
    tool_number: "",
    description: "",
    location: {
      shelf: "",
      bin: "",
    },
    status: {
      checked_out: false,
      username: "",
      date: new Date(),
      missing: false,
      damaged: false,
    },
  };
  const [tool, setTool] = useState(initialToolObj);
  const [error, setError] = useState("");

  const handleCancel = () => {
    setTool(initialToolObj);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/inventory/add`,
        tool,
        { withCredentials: true }
      );
      return res;
    } catch (err) {
      if (err.response.data) {
        setError({ message: err.response.data });
        setTimeout(() => setError(""), 3000);
      }
      console.log(err.response.data);
    }
  };

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
          Add New Tool
        </Modal.Title>
      </Modal.Header>
      {error.message && (
        <Alert key={error} variant='danger'>
          {error.message}
        </Alert>
      )}
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
              disabled
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
              disabled
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
              disabled
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
