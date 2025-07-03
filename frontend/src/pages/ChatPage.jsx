import { Container, Row } from 'react-bootstrap'
import Channels from '../components/chat/Channels.jsx'
import Messages from '../components/chat/Messages.jsx'
import RenderModal from '../modals/RenderModal.jsx'
import { useGetChannelsQuery } from '../services/channelsApi.js'
import { useGetMessagesQuery } from '../services/messagesApi.js'

const ChatPage = () => {
  const { isLoading: isLoadingChannels } = useGetChannelsQuery()
  const { isLoading: isLoadingMessages } = useGetMessagesQuery()
  const isLoading = isLoadingChannels || isLoadingMessages
  return (
    <>
      {isLoading && <Loader />}
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
