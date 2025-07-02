import { useSelector } from 'react-redux'
import { useGetMessagesQuery, useAddMessageMutation } from '../../services/messagesApi.js'
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  selectCurrentMessages,
  selectCurrentMessagesCount,
  selectCurrentChannelName,
} from '../../slices/messagesSelectors'

const Messages = () => {
  const username = useSelector(state => state.auth.username)
  const currentChannelId = useSelector(state => state.ui.selectedChannelId)
  const currentChannelName = useSelector(selectCurrentChannelName)
  const currentMessages = useSelector(selectCurrentMessages)
  const countMessages = useSelector(selectCurrentMessagesCount)
  const { isFetching } = useGetMessagesQuery()
  const [addMessage] = useAddMessageMutation()
  const [text, setText] = useState('')
  const { t } = useTranslation()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addMessage({ body: text, channelId: currentChannelId, username })
    setText('')
  }

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
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {isFetching
            ? t('messages.loading')
            : (
                currentMessages.map(m => (
                  <div key={m.id} className="text-break mb-2">
                    <b>{m.username}</b>
                    :
                    {m.body}
                  </div>
                ))
              )}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
            <InputGroup hasValidation>
              <Form.Control
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={t('chat.input')}
                className="border-0 p-0 ps-2"
                ref={inputRef}
              />
              <Button type="submit" variant="outline-secondary" disabled={!text.trim()}>
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{t('chat.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  )
}

export default Messages
