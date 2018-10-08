$(document).ready(function() {
  
  var database = firebase.database();
  //First Time - Push Back 1 Year to Ensure It Comes Before Current Time
  $("#add-train-btn").on("click", function (){

    //Grabs User Input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    //Create Local Temporary Object to Hold Train Data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq,
    }

    //Uploads Train Data
        database.ref().push(newTrain);
    //Allert
        alert("Train Successfully Added");

    //Clears All of the Boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#firstTrain-input").val("");
        $("#freq-input").val("");
  });
    //Create Firebase Event For Adding a Train Into the Database and a Row in the HTML When a User Adds an Entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        //Store Everything Into a Variable
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;

        //Declare Variable
        var trainFreq;

        //Time is to Be Entered on the Entry Form
        var firstTime = 0;
        
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

        //Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        //Differnce Between Times 
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        //Time Apart
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        //Minutes Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        //Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

        //Add Each Trains Data Into the Table
        $("#train-table > tbody").append("<tr><td>" + trainName + "<tr><td>" + trainDest + "<tr><td>" + trainFreq + "<tr><td>" + moment(nextTrain).format("HH:mm") + "<tr><td>" + tMinutesTillTrain + "<tr><td>");

    });

});