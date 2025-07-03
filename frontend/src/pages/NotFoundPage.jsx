import { Image } from 'react-bootstrap'
import pict1 from '../assets/pict1.svg'
import path from '../routes/routes.js'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <Image
        alt="Страница не найдена"
        src={pict1}
        className="h-25"
        fluid
      />
      <h1 className="h4 text-muted">{t('404.notFound')}</h1>
      <p className="text-muted">
        {t('404.move')}
        <Link to={path.chat}>
          {t('404.toMainPage')}
        </Link>
      </p>
    </div>
  )
}

export default NotFound
