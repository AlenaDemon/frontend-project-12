import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import HeaderNavbar from './HeaderNavbar.jsx'
import { path } from '../routes/routes.js'
import { ToastContainer } from 'react-toastify'
import LoginPage from '../pages/LoginPage.jsx'
import PrivateRoute from '../routes/PrivateRoute.jsx'
import ChatPage from '../pages/ChatPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <HeaderNavbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={path.chat} element={<ChatPage />} />
          </Route>
          <Route path={path.signup} element={<SignupPage />} />
          <Route path={path.login} element={<LoginPage />} />
          <Route path={path.notFound} element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
