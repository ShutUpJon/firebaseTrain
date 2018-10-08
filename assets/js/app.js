$(document).ready(function() {
  
    var database = firebase.database();
  // First Time - Always pushed back to 1 to ensure it works for the current time
   
  // Button to Add Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    // Create Local Temp Object to hold train info
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq
    };

    // Upload Train Data to Database
        database.ref().push(newTrain);


    //Alert - When Train Added
        alert("Train Successfully Added!");

    // Clears All Text Boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
    });

    // Create FFirebase Event for Adding Trains into Database
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;


    // Declare variable
    var trainFreq;

        // Time is to be entered on the entry form
        var firstTime = 0;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
     "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });

});