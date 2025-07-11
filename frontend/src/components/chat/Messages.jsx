import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {
  selectCurrentMessages,
  selectCurrentMessagesCount,
  selectCurrentChannelName,
} from '../../slices/messagesSelectors'
import MessagesForm from './MessagesForm.jsx'
import { useEffect, useRef } from 'react'

const Messages = () => {
  const currentChannelName = useSelector(selectCurrentChannelName)
  const currentMessages = useSelector(selectCurrentMessages)
  const countMessages = useSelector(selectCurrentMessagesCount)
  const { t } = useTranslation()
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [currentMessages])

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {'# '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">
            {countMessages}
            {' '}
            {t('chat.message', { count: countMessages })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesRef}>
          {currentMessages.map(m => (
            <div key={m.id} className="text-break mb-2">
              <b>{m.username}</b>
              {': '}
              {m.body}
            </div>
          ),
          )}
        </div>
        <MessagesForm />
      </div>
    </Col>
  )
}

export default Messages
