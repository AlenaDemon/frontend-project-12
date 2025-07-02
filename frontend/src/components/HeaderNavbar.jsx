import { Navbar, Container, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { removeAuth } from '../slices/authSlice.js'
import { useTranslation } from 'react-i18next'

const HeaderNavbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { t } = useTranslation()

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        { isAuthenticated
          ? (
              <Button
                variant="primary"
                onClick={() => dispatch(removeAuth())}
                className="float-end"
              >
                {t('chat.logout')}
              </Button>
            )
          : null }
      </Container>
    </Navbar>
  )
}

export default HeaderNavbar
