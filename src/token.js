const axios = require('axios')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URL
const authorizationCode = 'AUTHORIZATION_CODE'

axios
  .post('https://zoom.us/oauth/token', {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  })
  .then((response) => {
    // Access token is available in the response data
    const accessToken = response.data.access_token
    console.log('Access Token:', accessToken)
  })
  .catch((error) => {
    console.error('Error:', error.response.data)
  })
