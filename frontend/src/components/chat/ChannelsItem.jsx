import { Button, Nav, ButtonGroup, Dropdown } from 'react-bootstrap'
import { showModal } from '../../slices/uiSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ChannelItem = ({ channel, isSelected, onSelect }) => {
  const dispatch = useDispatch()
  const variant = isSelected ? 'secondary' : 'btn'
  const { t } = useTranslation()

  const handleShowModalRemove = (channel) => {
    dispatch(showModal({ type: 'removing', channel }))
  }
  const handleShowModalRename = (channel) => {
    dispatch(showModal({ type: 'renaming', channel }))
  }

  if (!channel.removable) {
    return (
      <Nav.Item className="w-100">
        <Button
          className="w-100 rounded-0 text-start"
          variant={variant}
          onClick={onSelect}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </Nav.Item>
    )
  }

  return (
    <Nav.Item className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={variant}
          onClick={onSelect}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
          <span className="visually-hidden">{t('chat.management')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleShowModalRemove(channel)}>
            {t('chat.remove')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleShowModalRename(channel)}>
            {t('chat.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  )
}

export default ChannelItem
