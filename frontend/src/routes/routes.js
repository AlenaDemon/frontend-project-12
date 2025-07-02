const path = {
  chat: '/chat',
  login: '/login',
  notFound: '*',
  signup: '/signup',
  api: '/api/v1',
  channels: '/channels',
  messages: '/messages',
  channelId: id => ['/channels', id].join('/'),
}

export default path
