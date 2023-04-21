//const mongoose = require('mongoose')
import mongoose from 'mongoose';
//import dotenv from 'dotenv/config'
function connectDB() {
    mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
        .then(() => {
            console.log("mongodb connected")
        })
        .catch(() => {
            console.log("failed to connect")
        })
}
export default connectDB();