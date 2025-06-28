export const path = {
    chat: '/',
    login: '/login',
    notFound: '*',
    signup: '/signup'
}

const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
}