import { RegistrationReqCollection, UserCollection } from '../dist/models/schema';

$( document ).ready(function() {
    $('#approve_btn').addEventListener('click', function(){
        var i = this.parentNode.parentNode.rowIndex;
        var table = document.getElementById("registrationTable");
        table.deleteRow(i);

        //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS
        var row = document.getElementById("request");
        var cell = row.getElementsByClassName("id");
        var id = cell[0].innerHTML;

        let requests = RegistrationReqCollection;
        let user = await requests.findOne({ _id: id });
        console.log("found user");
        await UserCollection.insertMany([user]);
        await requests.deleteOne({ _id: id });
    }
}
export async function approve(r) {
    var i = r.parentNode.parentNode.rowIndex;
    var table = document.getElementById("registrationTable");
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
    let user = await requests.findOne({ _id: id });
    console.log("found user");
    await UserCollection.insertMany([user]);
    await requests.deleteOne({ _id: id });
}
export function deny(r) {
    var i = r.parentNode.parentNode.rowIndex;
    var table = document.getElementById("registrationTable");
    table.deleteRow(i);
    //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTION
    //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS ADD TO USER COLLECTION
}
