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

// module.exports = {
//     UserCollection: new mongoose.model('users', LogInSchema),
//     RegistrationReqCollection: new mongoose.model('registration-request', LogInSchema),
//     RoleCollection: new mongoose.model('role', RoleSchema)
// }
//})
export const UserCollection = new mongoose.model('users', LogInSchema);
export const RegistrationReqCollection = new mongoose.model('registration-request', LogInSchema);
export const RoleCollection = new mongoose.model('role', RoleSchema)