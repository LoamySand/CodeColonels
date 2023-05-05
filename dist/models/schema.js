import mongoose from 'mongoose';
export function connectDB() {
    mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
        .then(() => {
        console.log("mongodb connected");
    })
        .catch(() => {
        console.log("failed to connect");
    });
}
export const db = mongoose.connection;
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
        type: Number,
        require: true,
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
    },
    providedServices: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    disciplinaryActions: {
        type: [mongoose.Schema.Types.ObjectId]
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
const ProvidedServiceSchema = new mongoose.Schema({
    forResident: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
// LOGIN REGISTRATION SCHEMA
export const UserCollection = mongoose.model('users', LogInSchema);
export const RegistrationReqCollection = mongoose.model('registration-request', LogInSchema);
//export const RoleCollection = mongoose.model('role', RoleSchema);
// SERVICES SCHEMA
export const ServicesCollection = mongoose.model('services', ServiceSchema);
export const ResidentCollection = mongoose.model('residents', ResidentSchema);
export const counters = mongoose.model('counters', CountersSchema, 'counters');
export const EventCollection = mongoose.model('events', EventSchema);
export const DisciplineCollection = mongoose.model('discipline', DisciplinaryActionSchema);
export const ResidentStayCollection = mongoose.model('stays', ResidentStaySchema);
export const ProvidedServiceCollection = mongoose.model('provided-services', ProvidedServiceSchema);
