import {RegistrationReqCollection, UserCollection, RoleCollection} from '../dist/models/schema';
//import {RegistrationReqCollection, UserCollection, RoleCollection} from '/models/schema.ts';
import mongoose from 'mongoose';
async function approve(r){
var i = r.parentNode.parentNode.rowIndex;
var table = document.getElementById("registrationTable") as HTMLTableElement;
table.deleteRow(i);
//TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS
    var row = document.getElementById("request");
    var cell = row.getElementsByClassName("id");
    var id = cell[0].innerHTML;
//      const id = {
//         //_id: document.body._id
//
//          _id = document.getElementById("id").get;
//     }

    let requests = RegistrationReqCollection;

    let user = await requests.findOne({ _id: id })
    console.log("found user")

    await UserCollection.insertMany([user])

    await requests.deleteOne({_id: id })


}

function deny(r){
var i = r.parentNode.parentNode.rowIndex;
var table = document.getElementById("registrationTable") as HTMLTableElement;
table.deleteRow(i);
//TODO REMOVE FROM REGISTRATION_REQUEST COLLECTION
//TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS ADD TO USER COLLECTION
}

