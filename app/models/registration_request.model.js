const mongoose = require("mongoose");

const RegistrationRequest = mongoose.model(
    "Registration Request",
    new mongoose.Schema({
        fName: String,
        lName: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = RegistrationRequest;