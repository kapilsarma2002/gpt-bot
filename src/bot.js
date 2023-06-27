const axios = require('axios')
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUrl = process.env.REDIRECT_URL

const joinMeeting = async (meetingId, passcode) => {
  try {
    // Fetch the Zoom access token using your OAuth authentication method
    const accessToken = await getZoomAccessToken()

    // Construct the join URL with the meeting ID and passcode
    const joinUrl = `https://zoom.us/j/${meetingId}?pwd=${passcode}`

    // Make a POST request to the Zoom API to join the meeting
    await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'Join Meeting',
        type: 1, // Instant Meeting
        start_time: new Date().toISOString(),
        join_url: joinUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('Joining the meeting:', joinUrl)
    // You can open the join URL in a browser or use an automation library like Puppeteer to automate the joining process
  } catch (error) {
    console.error('Failed to join the meeting:', error.response.data)
  }
}

const getZoomAccessToken = async () => {
  try {
    // Make a POST request to your OAuth provider to get the access token
    const response = await axios.post('YOUR_OAUTH_TOKEN_URL', {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    })

    return response.data.access_token
  } catch (error) {
    console.error('Failed to fetch Zoom access token:', error.response.data)
  }
}

// Call the joinMeeting function with the meeting ID and passcode
joinMeeting('MEETING_ID', 'MEETING_PASSCODE')
