import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { hideModal, selectChannel } from '../slices/uiSlice.js' // uiSlice, не modalSlice
import { useRemoveChannelMutation } from '../services/channelsApi.js'

const Remove = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()
  const { processedChannel } = useSelector(state => state.ui)
  const channelId = processedChannel?.id
  const defaultChannelId = '1'

  const handleRemove = async () => {
    try {
      await removeChannel(channelId).unwrap()
      toast.success(t('remove.removed'))
      dispatch(hideModal())
      dispatch(selectChannel(defaultChannelId))
    }
    catch {
      toast.error(t('errors.networkError'))
    }
  }

  if (!channelId) {
    dispatch(hideModal())
    return null
  }

  return (
    <Modal
      show
      centered
      onHide={() => dispatch(hideModal())}
      aria-labelledby="remove-channel-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="remove-channel-modal">
          {t('remove.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('remove.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => dispatch(hideModal())}
            disabled={isLoading}
          >
            {t('remove.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={handleRemove}
            disabled={isLoading}
          >
            {t('remove.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
