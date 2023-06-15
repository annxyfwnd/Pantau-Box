const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())

const router = require("./routes/router")

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})