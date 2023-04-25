async function approveReq() {
    // var i = $(this).parentNode.parentNode.rowIndex;
    // var table = $("#registrationTable") as HTMLTableElement;
    // var row = table.getElementsByClassName(".request");
    // var cell = row[0].getElementsByClassName(".id");
    // var id = cell[0].innerHTML;
    //
    // alert('User clicked on' + i);
    //
    //
    // let user = await RegistrationReqCollection.findOne({ _id: id })
    // console.log("found user")
    //
    // await UserCollection.insertMany([user])
    //
    // await RegistrationReqCollection.deleteOne({_id: id })
    this.style.backgroundColor = "red";
}
$(document).ready(function () {
    var i = $(this).parentNode.parentNode.rowIndex;
    document.getElementById("approve_btn").onclick = function () { approveReq; };
    //$(document).on('click', '#approve_btn', approveReq())
    //document.getElementsByClassName("approve")[i].addEventListener("click", approveReq);
    //$('.request').on('click', '#approve_btn', approveReq())
    // var approveA = $("<td>").attr("href","#").addClass("saveBtn").text("Approve");
    // var approveBtn = $("#approve_btn").attr("aria-disabled",false).append(approveA);
    // $(document).find(".actions ul").prepend(approveBtn)
    //
    //             var i = this.parentNode.parentNode.rowIndex;
    //             var table = document.getElementById("registrationTable") as HTMLTableElement;
    //             table.deleteRow(i);
    // //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS
    //             var row = document.getElementById("request");
    //             var cell = row.getElementsByClassName("id");
    //             var id = cell[0].innerHTML;
    //
    //             let requests = RegistrationReqCollection;
    //
    //             let user = await requests.findOne({ _id: id })
    //             console.log("found user")
    //
    //             await UserCollection.insertMany([user])
    //
    //             await requests.deleteOne({_id: id })
});
export {};
//
// async function approve(r){
// var i = r.parentNode.parentNode.rowIndex;
// var table = document.getElementById("registrationTable") as HTMLTableElement;
// table.deleteRow(i);
// //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS
//     var row = document.getElementById("request");
//     var cell = row.getElementsByClassName("id");
//     var id = cell[0].innerHTML;
//
//     let requests = RegistrationReqCollection;
//
//     let user = await requests.findOne({ _id: id })
//     console.log("found user")
//
//     await UserCollection.insertMany([user])
//
//     await requests.deleteOne({_id: id })
//
//
// },
//
// function deny(r){
// var i = r.parentNode.parentNode.rowIndex;
// var table = document.getElementById("registrationTable") as HTMLTableElement;
// table.deleteRow(i);
// //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTION
// //TODO REMOVE FROM REGISTRATION_REQUEST COLLECTIONS ADD TO USER COLLECTION
// }
