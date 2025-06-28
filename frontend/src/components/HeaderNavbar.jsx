import { Navbar, Container } from 'react-bootstrap'

const HeaderNavbar = () => {
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default HeaderNavbar