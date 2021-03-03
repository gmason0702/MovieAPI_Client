import React, { useState } from "react";
import { Collapse, NavItem, Button, Nav, Navbar } from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="faded" light expand="md">
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button onClick={props.logout}>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
