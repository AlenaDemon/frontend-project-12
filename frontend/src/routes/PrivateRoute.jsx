import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import path from './routes.js'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to={path.login} replace />
  }

  return children
}

export default PrivateRoute
