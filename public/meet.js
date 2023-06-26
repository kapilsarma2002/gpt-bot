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

function joinMeeting(meetingId, passcode) {
  try {
    const joinUrl = `https://zoom.us/j/${meetingId}?pwd=${passcode}`
    window.location.href = joinUrl
  } catch (err) {
    console.log('error is ' + err)
  }
}

// 873 2111 9257
// bnb6NC
