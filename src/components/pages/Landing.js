import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";

export default function Landing() {
  return (
    <Jumbotron style={{ margin: "10vh auto" }}>
      <h1 style={{ textAlign: "center" }}>Welcome to Tool Tracker</h1>
      <p style={{ maxWidth: "600px" }}>
        An easy to use tool inventory management app with built in user control
        and report system.
      </p>
      <p style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={"/login"}>
          <Button variant='outline-primary'>
            Sign in
          </Button>
        </Link>
      </p>
    </Jumbotron>
  );
}
