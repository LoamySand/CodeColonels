const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("mongodb connected")
})
.catch(() => {
    console.log("failed to connect")
})