import {RegistrationReqCollection, UserCollection, RoleCollection} from "/models/schema.js";
//import {RegistrationReqCollection, UserCollection, RoleCollection} from '/models/schema.js';
import mongoose from 'mongoose';
async function approve(r){
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("registrationTable").deleteRow(i);
//TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS
//      const id = {
//         _id: req.body._id
//     }

    let requests = RegistrationReqCollection;

    let user = await requests.findOne({ _id: id._id })
    console.log("found user")

    await UserCollection.insertMany([user])

    await requests.deleteOne({_id: id._id })


}

function deny(r){
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("registrationTable").deleteRow(i);
//TODO REMOVE FROM REGISTRATION_REQUEST COLLECTION
//TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS ADD TO USER COLLECTION
}

