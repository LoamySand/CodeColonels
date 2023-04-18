const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
.then(() => {
    console.log("mongodb connected")
})
.catch(() => {
    console.log("failed to connect")
})

const LogInSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = {
    UserCollection: new mongoose.model("users", LogInSchema),
    RegistrationReqCollection: new mongoose.model("registration-request", LogInSchema)
}