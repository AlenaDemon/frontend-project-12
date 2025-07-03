import { useSelector } from 'react-redux'
import { useAddMessageMutation } from '../../services/messagesApi.js'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import filter from 'leo-profanity'
import { toast } from 'react-toastify'

const MessagesForm = () => {
  const username = useSelector(state => state.auth.username)
  const currentChannelId = useSelector(state => state.ui.selectedChannelId)
  const { t } = useTranslation()
  const inputRef = useRef()
  const [sendMessage] = useAddMessageMutation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
          body: filter.clean(values.body),
          channelId: currentChannelId,
          username,
        }
        await sendMessage(newMessage).unwrap()
        resetForm()
      }
      catch {
        toast.error(t('errors.networkError'))
      }
    },
  })
  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            aria-label="Новое сообщение"
            placeholder={t('chat.input')}
            className="border-0 p-0 ps-2"
            ref={inputRef}
          />
          <Button type="submit" variant="outline-secondary" disabled={formik.isSubmitting}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessagesForm
