import { Button, Container, Navbar, Modal } from "react-bootstrap";

const NavbarComponent = (props) => {
  return (
    <Navbar expand="sm">
      <Navbar.Brand href="/">Store</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
      <Button>Cart 0 Items</Button>
    </Navbar>
  );
};

export default NavbarComponent;
