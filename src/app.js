const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = 3000

require('dotenv').config()

app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

app.get('/home', (req, res) => {
  res.sendFile('home.html', { root: 'public' })
})

app.get('/thankyou', (req, res) => {
  res.sendFile('thankyou.html', { root: 'public' })
})

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URL

app.post('/join-meeting', async (req, res) => {
  const { meetingLink, passcode } = req.body

  console.log(req.body)

  try {
    // Exchange the authorization code for an access token
    const { data } = await axios.post('https://zoom.us/oauth/token', {
      grant_type: 'authorization_code',
      code: passcode,
      redirect_uri: redirectUri, // Replace with your own redirect URI
      client_id: clientId,
      client_secret: clientSecret,
    })

    // console.log(data)

    const accessToken = data.access_token
    console.log('access token :', accessToken)

    // Use the access token to join the meeting
    const { data: joinMeetingResponse } = await axios.post(
      `https://api.zoom.us/v2/meetings/${meetingLink}/registrants`,
      {
        email: 'bot.gpt.17@gmail.com',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    // Handle the join meeting response as per your requirement
    console.log(joinMeetingResponse)

    res.status(200).json({ message: 'Meeting joined successfully' })
  } catch (error) {
    console.error(error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    }

    res.status(500).json({ error: 'Failed to join meeting' })
  }
})

app.listen(port, () => {
  console.log(`App listening on port number ${port}`)
})
