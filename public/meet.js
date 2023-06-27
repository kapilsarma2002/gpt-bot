const axios = require('axios')
const email = process.env.EMAIL
const password = process.env.PASSWORD

document.addEventListener('DOMContentLoaded', () => {
  const inputLink = document.getElementById('meetLink')
  const inputPass = document.getElementById('meetPass')
  const add = document.querySelector('.add')
  console.log(add)

  let meetingLink = ''
  let meetingPass = ''

  function handleLinkInput(event) {
    meetingLink = event.target.value
    console.log('Link value:', meetingLink)
  }

  function handlePassInput(event) {
    meetingPass = event.target.value
    console.log('Pass value: ', meetingPass)
  }

  inputLink.addEventListener('input', handleLinkInput)
  inputPass.addEventListener('input', handlePassInput)

  // adding the bot to the meeting
  add.addEventListener('click', () => {
    const meetingId = meetingLink.trim()
    const passcode = meetingPass.trim()

    if (meetingId !== '' && passcode !== '') {
      joinMeeting(meetingId, passcode)
    } else {
      console.log('sar sarle')
    }
  })
})

const joinMeeting = async (meetingId, passcode) => {
  const joinUrl = `https://api.zoom.us/v2/meetings/${meetingId}/registrants`
  const joinData = {
    email: email,
    password: password,
    join_before_host: true,
    meeting_pwd: passcode,
  }

  try {
    await axios.post(joinUrl, joinData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    res.send('Bot successfully joined the Zoom meeting!')
  } catch (error) {
    console.error('Error:', error.response.data)
    res.status(500).send('An error occurred while joining the meeting.')
  }
}
