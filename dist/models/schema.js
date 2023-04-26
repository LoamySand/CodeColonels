//var requirejs = require('requirejs');
// require(['require', 'mongoose'], function(require) {
// });
import mongoose from 'mongoose';
//onst { Schema } = require("mongoose");
//let mongoose = require('mongoose')
//var moduleName = 'mongoose';
//require([moduleName], function(fooModule){
// do something with fooModule
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
});
// const RoleSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     }
// })
export function connectDB() {
    mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
        .then(() => {
        console.log("mongodb connected");
    })
        .catch(() => {
        console.log("failed to connect");
    });
}
// module.exports = {
//     UserCollection: new mongoose.model('users', LogInSchema),
//     RegistrationReqCollection: new mongoose.model('registration-request', LogInSchema),
//     RoleCollection: new mongoose.model('role', RoleSchema)
// }
//})

// LOGIN REGISTRATION SCHEMA
export const UserCollection = mongoose.model('users', LogInSchema);
export const RegistrationReqCollection = mongoose.model('registration-request', LogInSchema);
//export const RoleCollection = mongoose.model('role', RoleSchema);

// SERVICES SCHEMA
