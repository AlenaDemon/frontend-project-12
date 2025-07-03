import React from 'react'
import { Col, Button, Nav } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectChannel, showModal } from '../../slices/uiSlice.js'
import ChannelItem from './ChannelsItem.jsx'
import { useTranslation } from 'react-i18next'

const Channels = () => {
  const dispatch = useDispatch()
  const channelsState = useSelector(state => state.channels)
  const currentChannelId = useSelector(state => state.ui.selectedChannelId)
  const { t } = useTranslation()

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          onClick={() => dispatch(showModal({ type: 'adding' }))}
          type="button"
          className="p-0 text-primary"
          variant="group-vertical"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsState.ids.map((id) => {
          const channel = channelsState.entities[id]
          const isSelected = id === currentChannelId
          return (
            <ChannelItem
              key={id}
              channel={channel}
              isSelected={isSelected}
              onSelect={() => dispatch(selectChannel(channel.id))}
            />
          )
        })}
      </Nav>
    </Col>
  )
}

export default Channels
