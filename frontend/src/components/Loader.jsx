// components/Loader.jsx
import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => (
  <div className="position-fixed top-50 start-50 translate-middle">
    <Spinner animation="border" role="status" variant="primary">
    </Spinner>
  </div>
)

export default Loader
