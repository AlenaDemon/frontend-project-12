import React from "react"
import { Image } from 'react-bootstrap'
import pict1 from '../assets/pict1.svg'
import { path } from '../routes/routes.js'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center">
      <Image 
        alt="Страница не найдена" 
        src={pict1} 
        className="h-25"
        fluid
      />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти{' '}
        <Link to={path.chat}>
          на главную страницу
        </Link>
      </p>
    </div>
  )
}

export default NotFound