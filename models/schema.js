let mongoose = require('mongoose')

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    }
})

const RoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = {
    UserCollection: new mongoose.model('users', LogInSchema),
    RegistrationReqCollection: new mongoose.model('registration-request', LogInSchema),
    RoleCollection: new mongoose.model('role', RoleSchema)
}