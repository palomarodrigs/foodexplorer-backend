const express = require('express')

const app = express()
app.use(express.json())

app.get('/message', (request, response) => {
  response.json('Hello world.')
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
