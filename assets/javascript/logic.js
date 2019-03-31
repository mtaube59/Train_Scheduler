// Initialize Firebase
var config = {
    apiKey: "AIzaSyAbikwpbT9TYoTOiyc5gImelzmQrj_Uge8",
    authDomain: "train-schedule-1a1d0.firebaseapp.com",
    databaseURL: "https://train-schedule-1a1d0.firebaseio.com",
    projectId: "train-schedule-1a1d0",
    storageBucket: "train-schedule-1a1d0.appspot.com",
    messagingSenderId: "202700202219"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;
var firstTrainTime = "";

$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrainTime = $("#time").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,

    });

    $("#train").val("")
    $("#destination").val("")
    $("#frequency").val("")
    $("#time").val("")

});

database.ref().on("child_added", function (snapshot) {
    var output = snapshot.val();
    var currentTime = moment();
    console.log("currentTime", currentTime);
    var firstTrainTime = output.firstTrainTime
    console.log("firsttrain", firstTrainTime);
    var frequency = output.frequency;
    console.log("frequency", frequency);
    console.log("=======");
    var timePast = currentTime.diff(moment(firstTrainTime, "hh:mm"), "minutes");
    console.log("diff", timePast);
    var modulus = timePast % frequency
    console.log(modulus);
    var difference = frequency - modulus;
    console.log(difference);
    var nextTrain = currentTime.add(difference, "minutes").format("hh:mm a");
    console.log(nextTrain);

    var row = $("<tr>");
    var data = $("<td>");
    var data1 = $("<td>");
    var data2 = $("<td>");
    var data3 = $("<td>");
    var data4 = $("<td>");
    data.text(output.trainName);
    row.append(data);
    data1.text(output.destination);
    row.append(data1);
    data2.text(output.frequency);
    row.append(data2);
    data3.text(nextTrain);
    row.append(data3);
    data4.text(difference);
    row.append(data4);
    $("#table").append(row);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
