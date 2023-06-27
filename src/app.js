const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

app.get('/home', (req, res) => {
  res.sendFile('home.html', { root: 'public' })
})

app.get('/thankyou', (req, res) => [
  res.sendFile('thankyou.html', { root: 'public' }),
])

const accessToken = 'YOUR_ACCESS_TOKEN'

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URL

// Step 1: Redirect the user to the Zoom authorization URL
app.get('/auth', (req, res) => {
  const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
  res.redirect(authUrl)
})

// Step 2: Handle the callback after user authorization
app.get('/callback', async (req, res) => {
  const { code } = req.query

  try {
    // Step 3: Exchange authorization code for access token
    const tokenUrl = 'https://zoom.us/oauth/token'
    const response = await axios.post(tokenUrl, {
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    })

    const accessToken = response.data.access_token

    // Step 4: Use the access token to make API requests
    // You can join a meeting using the access token here

    res.send('Authorization successful! You can now join a meeting.')
  } catch (error) {
    console.error(
      'Error exchanging authorization code for access token:',
      error
    )
    res.status(500).send('An error occurred during authorization.')
  }
})

app.listen(port, () => {
  console.log(`App listening on port number ${port}`)
})
