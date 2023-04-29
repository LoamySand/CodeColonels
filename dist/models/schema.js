//var requirejs = require('requirejs');
// require(['require', 'mongoose'], function(require) {
// });
import mongoose from 'mongoose';
//import Inc from 'mongoose-sequence';
//const AutoIncrement = Inc(mongoose);
//onst { Schema } = require("mongoose");
//let mongoose = require('mongoose')
//var moduleName = 'mongoose';
//require([moduleName], function(fooModule){
// do something with fooModule
//const connection = mongoose.createConnection("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
//Inc.initialize(connection);
export function connectDB() {
    mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
        .then(() => {
        console.log("mongodb connected");
    })
        .catch(() => {
        console.log("failed to connect");
    });
    //const db = mongoose.connection;
    // db.collection("ResidentCollection").createIndex({residentID : 1}, {unique : true});
}
export const db = mongoose.connection;
// export function insertDocument(doc, targetCollection) {
//     while (1) {
//
//         var cursor = targetCollection.find( {}, { _id: 1 } ).sort( { _id: -1 } ).limit(1);
//         var seq;
//         if( cursor._id == 0) {
//             seq = 1;
//         } else {
//             seq = cursor.next()._id + 1;
//         }
//         doc._id = seq;
//
//         var results = targetCollection.insertMany([doc]);
//
//         if( results.hasWriteError() ) {
//             if( results.writeError.code == 11000 /* dup key */ )
//                 continue;
//             else
//                 console.log( "unexpected error inserting data: ");
//         }
//
//         break;
//     }
//}
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
    },
    effectiveStart: {
        type: String,
        required: false
    },
    effectiveEnd: {
        type: String,
        required: false
    }
});
//TODO ResidentSchema
const ResidentSchema = new mongoose.Schema({
    residentID: {
        type: Number,
        default: 0
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'Intersex'],
        required: true
    },
    gender: {
        type: String,
        enum: ['Man', 'Woman', 'Transgender', 'Non-binary', 'Gender fluid', 'Other'],
        required: true
    },
    pronouns: {
        type: String,
        enum: ['He/Him/His', 'She/Her/Hers', 'They/Them/Theirs'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    features: {
        type: [String],
        required: false
    }
});
const CountersSchema = new mongoose.Schema({
    seq: {
        type: Number
    }
});
//ResidentSchema.plugin(AutoIncrement, { inc_field: 'residentID', disable_hooks: true});
//ResidentSchema.plugin(AutoIncrement, {inc_field: 'residentID'});
//TODO EventsSchema
const EventSchema = new mongoose.Schema({
    forResident: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
});
//TODO DisciplinaryActionSchema
const DisciplinaryActionSchema = new mongoose.Schema({
    forResident: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['Warning', 'Education', 'Last Chance Contract', 'Step Away'],
        required: true
    },
    notes: {
        type: String,
        required: true
    }
});
//TODO ResidentStaySchema
const ResidentStaySchema = new mongoose.Schema({
    forResident: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    providedServices: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    }
});
export var IDCount;
export async function updateCounter() {
    IDCount = await counters.findOne({}, { seq: 1, _id: 0 });
    //console.log(count.seq)
    IDCount = IDCount.seq + 1;
    //console.log(count)
    await counters.updateOne({}, { seq: IDCount });
    IDCount = await counters.findOne({}, { seq: 1, _id: 0 });
    IDCount = IDCount.seq;
}
;
// LOGIN REGISTRATION SCHEMA
export const UserCollection = mongoose.model('users', LogInSchema);
export const RegistrationReqCollection = mongoose.model('registration-request', LogInSchema);
//export const RoleCollection = mongoose.model('role', RoleSchema);
// SERVICES SCHEMA
export const ServicesCollection = mongoose.model('services', ServiceSchema);
export const ResidentCollection = mongoose.model('residents', ResidentSchema);
export const counters = mongoose.model('counters', CountersSchema, 'counters');
