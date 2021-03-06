const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()

app
  .use(cookieParser())
  .use(
    cors({
      credentials: true,
      origin: 'https://rocky-eyrie-7370-server.herokuapp.com',
    })
  )
  .use(express.static(__dirname))
  .use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)
