import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HeaderNavbar from './components/HeaderNavbar.jsx'
import path from './routes/routes.js'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import ChatPage from './pages/ChatPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { useSelector } from 'react-redux'

const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <HeaderNavbar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated
                ? <Navigate to={path.chat} replace />
                : <Navigate to={path.login} replace />
            }
          />
          <Route
            path={path.chat}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
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
