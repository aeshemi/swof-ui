import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>Support Wheel of Fate</Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer to="/" exact>
          <NavItem>Calendar</NavItem>
        </LinkContainer>
        <LinkContainer to="/list">
          <NavItem>List</NavItem>
        </LinkContainer>
        <LinkContainer to="/generator">
          <NavItem>Generator</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
