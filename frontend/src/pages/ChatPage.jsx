import { Container, Row } from 'react-bootstrap'
import Channels from '../components/chat/Channels.jsx'
import Messages from '../components/chat/Messages.jsx'
import RenderModal from '../modals/RenderModal.jsx'
import { useGetChannelsQuery } from '../services/channelsApi.js'
import { useGetMessagesQuery } from '../services/messagesApi.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { removeAuth } from '../slices/authSlice.js'
import LoginPage from './LoginPage.jsx'
import Loader from '../components/Loader.jsx'

const ChatPage = () => {
  const { error: channelsError, isLoading: isChannelsLoading } = useGetChannelsQuery()
  const { error: messagesError, isLoading: isMessagesLoading } = useGetMessagesQuery()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    const error = messagesError || channelsError
    if (error) {
      if (error.status === 401) {
        dispatch(removeAuth())
        toast.error(t('errors.fetchError'))
      }
      else {
        toast.error(t('errors.networkError'))
      }
    }
  }, [dispatch, messagesError, channelsError])

  if (isChannelsLoading || isMessagesLoading) {
    return (
      <><Loader /></>
    )
  }

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <RenderModal />
    </>
  )
}

export default ChatPage
