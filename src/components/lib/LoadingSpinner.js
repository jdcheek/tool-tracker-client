import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className='load-spinner'>
      <Spinner animation='border' role='status' className='spinner-spin'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
}
