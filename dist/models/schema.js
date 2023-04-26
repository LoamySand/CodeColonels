//var requirejs = require('requirejs');
// require(['require', 'mongoose'], function(require) {
// });
import mongoose from 'mongoose';
//onst { Schema } = require("mongoose");
//let mongoose = require('mongoose')
//var moduleName = 'mongoose';
//require([moduleName], function(fooModule){
// do something with fooModule
export function connectDB() {
    mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
        .then(() => {
        console.log("mongodb connected");
    })
        .catch(() => {
        console.log("failed to connect");
    });
}
// LOGIN REGISTRATION SCHEMA
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
const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    permanent: {
        type: Boolean,
        required: true,
    }
    //Perhaps start and end date? Not required.
});
// LOGIN REGISTRATION SCHEMA
export const UserCollection = mongoose.model('users', LogInSchema);
export const RegistrationReqCollection = mongoose.model('registration-request', LogInSchema);
//export const RoleCollection = mongoose.model('role', RoleSchema);
// SERVICES SCHEMA
export const ServicesCollection = mongoose.model('services', ServiceSchema);
