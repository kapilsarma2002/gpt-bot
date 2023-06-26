const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

app.get('/home', (req, res) => {
  res.sendFile('home.html', { root: 'public' })
})

app.get('/thankyou', (req, res) => [
  res.sendFile('thankyou.html', { root: 'public' })
])

app.listen(port, () => {
  console.log(`App listening on port number ${port}`)
})
