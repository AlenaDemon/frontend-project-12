import { Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Loader = () => {
  const { t } = useTranslation()
  return (
    <div className="position-fixed top-50 start-50 translate-middle">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('messages.loading')}</span>
      </Spinner>
    </div>
  )
}

export default Loader
